<script setup>
import Photo from "@/views/create/character/components/Photo.vue";
import Name from "@/views/create/character/components/Name.vue";
import Profile from "@/views/create/character/components/Profile.vue";
import BackGroundImage from "@/views/create/character/components/BackGroundImage.vue";
import {onMounted, ref, useTemplateRef} from "vue";
import {base64ToFile} from "@/js/utils/base64_to_file.js";
import api from "@/js/http/api.js";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import Voice from "@/views/create/character/components/Voice.vue";
import ToggleVoiceOutput from "@/views/create/character/components/ToggleVoiceOutput.vue";

const router = useRouter();
const user = useUserStore()
const photoref = useTemplateRef('photo-ref')
const nameref = useTemplateRef('name-ref')
const profileref = useTemplateRef('profile-ref')
const backGroundImageref = useTemplateRef('backGroundImage-ref')
const errorMessage = ref('')
const voiceRef = useTemplateRef('voice-ref')
const toggleVoiceOutputRef = useTemplateRef('toggle-voice-output-ref')

const voices = ref([])
const curVoiceId = ref(null)

onMounted(async () => {
  try {
    const res = await api.get(`api/create/character/voice/get_list/`, {})
    const data  = res.data
    if (data.result === 'success') {
      voices.value = data.voices
      curVoiceId.value = data.voices[0].id
    }
  } catch (err) {
  }
})

async function handleCreate() {
  const photo = photoref.value.myPhoto
  const name = nameref.value.myName?.trim()
  const voice = voiceRef.value.myVoice
  const enableVoiceOutput = toggleVoiceOutputRef.value.isEnabled
  const profile = profileref.value.myProfile?.trim()
  const backgroundImage = backGroundImageref.value.myBackgroundImage

  errorMessage.value = ''
  if (!photo) {
    errorMessage.value = '头像不能为空'
  }else if (!name) {
    errorMessage.value = '名字不能为空'
  } else if (!voice) {
    errorMessage.value = '音色不能为空'
  }else if (!profile) {
    errorMessage.value = '简介不能为空'
  } else if(!backgroundImage) {
    errorMessage.value = '背景图片不能为空'
  } else {
    const formData = new FormData()
    formData.append('photo', base64ToFile(photo,'photo.png'))
    formData.append('name', name)
    formData.append('voice_id', voice)
    formData.append('enable_voice_output', enableVoiceOutput)
    formData.append('profile', profile)
    formData.append('background_image',base64ToFile(backgroundImage,'background_image.png'))

    try{
      const res = await api.post('/api/create/character/create/', formData)
      const data = res.data
      if (data.result === 'success') {
        await router.push({
          name:'user-space-index',
          params:{
            user_id: user.id,
          }
        })
      } else {
        errorMessage.value = data.result
      }
    } catch (err) {
      console.error(err)
    }

  }
}
</script>

<template>
  <div class="flex justify-center">
    <div class="card w-120 bg-base-200 shadow-sm mt-16">
      <div class="card-body">
        <h3 class = "text-lg font-bold my-4">创建角色</h3>
        <Photo ref = "photo-ref" />
        <Name ref = "name-ref" />
        <Voice ref = "voice-ref" :voices="voices" :curVoiceId = "curVoiceId"/>
        <ToggleVoiceOutput ref = "toggle-voice-output-ref" />
        <Profile ref = "profile-ref" />
        <BackGroundImage ref = "backGroundImage-ref" />

        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        <div class="flex justify-center">
          <button @click="handleCreate" class="btn btn-neutral w-60 mt-2">
            创建
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>