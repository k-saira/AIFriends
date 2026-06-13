<script setup>

import {ref, watch} from "vue";

const props = defineProps({
  enableVoiceOutput: {
    type: Boolean,
    default: false,
  }
})

const isEnabled = ref(props.enableVoiceOutput)

watch(() => props.enableVoiceOutput, newVal => {
  isEnabled.value = newVal
})

defineExpose({
  isEnabled,
})

</script>

<template>
  <fieldset class="fieldset">
    <label class="label text-base">语音输出</label>
    <label class="flex items-center gap-2 cursor-pointer">
      <input v-model="isEnabled" type="checkbox" class="toggle" />
      <span class="text-sm text-base-content/60">{{ isEnabled ? '开启' : '关闭' }}</span>
    </label>
  </fieldset>
</template>

<style scoped>

</style>
