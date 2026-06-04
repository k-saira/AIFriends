<script setup>
import {computed, nextTick, ref, useTemplateRef} from "vue";
import InputField from "@/components/character/chat_field/input_field/InputField.vue";
import CharacterPhotoField from "@/components/character/chat_field/character_photo_field/CharacterPhotoField.vue";
import ChatHistory from "@/components/character/chat_field/chat_history/ChatHistory.vue";

const props = defineProps(['friend'])
const modalRef = useTemplateRef('modal-ref')
const inputRef = useTemplateRef('input-ref')
const history = ref([])
const chatHistoryRef = useTemplateRef('chat-history-ref')
const isExpanded = ref(false)

async function showModal() {
  modalRef.value.showModal()

  await nextTick()
  inputRef.value.focus()
}


const modalStyle = computed(() => {
  if (props.friend) {
    return {
      backgroundImage: `url(${props.friend.character.background_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }
  } else {
    return {}
  }
})

function handlePushFrontMessage(msg) {
  history.value.unshift(msg)

}
function handlePushBackMessage(msg) {
  history.value.push(msg)
  chatHistoryRef.value.scrollToBottom()
}

function handleAddToLastMessage(delta) {
  history.value.at(-1).content += delta
  chatHistoryRef.value.scrollToBottom()
}

function handleClose() {
  modalRef.value.close()
  inputRef.value.close()
}


defineExpose({
  showModal,
})
</script>

<template>
  <dialog ref = "modal-ref" class = "modal">
    <div class="modal-box transition-all duration-300" :class="isExpanded ? 'w-[90vw] h-[90vh] max-w-none' : 'w-90 h-180'" :style="modalStyle">
      <button @click="handleClose" class="btn btn-sm btn-circle btn-ghost bg-transparent absolute right-1 top-1">✕</button>
      <button @click="isExpanded = !isExpanded" class="btn btn-sm btn-circle btn-ghost bg-transparent absolute right-9 top-1 text-lg">
        {{ isExpanded ? '⤡' : '⤢' }}
      </button>
      <ChatHistory
          ref = "chat-history-ref"
          v-if="friend"
          :history = 'history'
          :friendId = 'friend.id'
          :character = 'friend.character'
          :isExpanded = 'isExpanded'
          @pushFrontMessage="handlePushFrontMessage"
      />
      <InputField
          v-if="friend"
          ref="input-ref"
          :friendId="friend.id"
          :isExpanded = 'isExpanded'
          @pushBackMessage="handlePushBackMessage"
          @addToLastMessage="handleAddToLastMessage"
      />
      <CharacterPhotoField v-if="friend" :character="friend.character" />
    </div>
  </dialog>
</template>

<style scoped>

</style>