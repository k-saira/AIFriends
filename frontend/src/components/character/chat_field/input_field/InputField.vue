<script setup>

import MicIcon from "@/components/character/icons/MicIcon.vue";
import SendIcon from "@/components/character/icons/SendIcon.vue";
import {ref, useTemplateRef} from "vue";
import streamApi from "@/js/http/streamApi.js";
import Microphone from "@/components/character/chat_field/input_field/Microphone.vue";


const props = defineProps(['friendId', 'isExpanded'])
const emit = defineEmits(['pushBackMessage', 'addToLastMessage']);
const inputref = useTemplateRef('input-ref')
const message = ref('')
let ProcessId = 0
const showMic = ref(false)

function focus() {
  inputref.value.focus()
}

async function handleSend(event, audio_msg) {
  let content
  if (audio_msg) {
    content = audio_msg.trim()
  } else {
    content = message.value.trim()
  }
  if (!content) return

  const curId = ++ ProcessId

  message.value = ''

  emit('pushBackMessage',{role: 'user', content: content, id: crypto.randomUUID()})
  emit('pushBackMessage', {role: 'ai', content: '', id: crypto.randomUUID()})
  try {
    await streamApi('/api/friend/message/chat/', {
      body: {
        friend_id: props.friendId,
        message: content,
      },
      onmessage(data, isDone) {
        if (curId !== ProcessId) return
        if (data.content) {
          emit('addToLastMessage', data.content)
        }
      },
      onerror(err) {
      }

    })
  } catch (err) {
  }
}

function close() {
  ++ ProcessId
  showMic.value = false
}

function handleStop() {
  ++ ProcessId
}

defineExpose({
  focus,
  close,
})
</script>

<template>
  <form v-if="!showMic" @submit.prevent="handleSend" class="absolute bottom-4 left-2 h-12 flex items-center"
        :class="props.isExpanded ? 'right-4' : 'w-86'" >
    <input class="input bg-black/30  bbackdrop-blur-sm text-white text-base w-full h-full rounded-2xl pr-20"
           type="text"
           placeholder="文本输入..."
           ref="input-ref"
           v-model="message"
    >
    <div @click="handleSend" class="absolute right-2 w-8 h-8 flex items-center justify-center cursor-pointer">
      <SendIcon/>
    </div>
    <div @click="showMic = true" class="absolute right-10 w-8 h-8 flex items-center justify-center cursor-pointer">
      <MicIcon/>
    </div>
  </form>
  <Microphone
      v-else
      :isExpanded="props.isExpanded"
      @close="showMic = false"
      @send = "handleSend"
      @stop = "handleStop"
  />
</template>

<style scoped>

</style>