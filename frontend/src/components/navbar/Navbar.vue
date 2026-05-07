<script setup>
import { ref } from 'vue'
import MenuIcon from "@/components/icons/MenuIcon.vue";
import HomepageIcon from "@/components/icons/HomepageIcon.vue";
import FriendIcon from "@/components/icons/FriendIcon.vue";
import CreateIcon from "@/components/icons/CreateIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

// 使用 Vue 变量控制开关状态，而不是依赖纯 CSS 的 checkbox 选中
const isCollapsed = ref(false)
</script>

<template>
  <div class="flex h-screen w-full bg-base-100" data-theme="light">

    <aside
      class="bg-base-200 transition-all duration-300 flex flex-col shrink-0 border-r border-base-300"
      :class="isCollapsed ? 'w-16' : 'w-48'"
    >
      <ul class="menu w-full p-2 gap-2">
        <li>
          <button
            class="flex items-center py-3"
            :class="isCollapsed ? 'justify-center tooltip tooltip-right' : ''"
            :data-tip="isCollapsed ? '首页' : null"
          >
            <HomepageIcon/>
            <span v-if="!isCollapsed" class="ml-2 transition-opacity whitespace-nowrap">首页</span>
          </button>
        </li>

        <li>
          <button
            class="flex items-center py-3"
            :class="isCollapsed ? 'justify-center tooltip tooltip-right' : ''"
            :data-tip="isCollapsed ? '好友' : null"
          >
            <FriendIcon/>
            <span v-if="!isCollapsed" class="ml-2 transition-opacity whitespace-nowrap">好友</span>
          </button>
        </li>

        <li>
          <button
            class="flex items-center py-3"
            :class="isCollapsed ? 'justify-center tooltip tooltip-right' : ''"
            :data-tip="isCollapsed ? '创作' : null"
          >
            <CreateIcon/>
            <span v-if="!isCollapsed" class="ml-2 transition-opacity whitespace-nowrap">创作</span>
          </button>
        </li>

      </ul>
    </aside>

    <div class="flex flex-col flex-1 min-w-0">
      <nav class="navbar w-full bg-base-100 h-16 shrink-0 shadow-sm">
        <div class="navbar-start">
          <div class="flex-none">
            <button
              @click="isCollapsed = !isCollapsed"
              class="btn btn-square btn-ghost"
            >
              <MenuIcon/>
            </button>
          </div>
          <div class="flex-1 px-2 font-bold text-lg">AIFriends</div>
        </div>
        <div class="navbar-center w-4/5 max-w-180 flex justify-center">
          <div class="join w-4/5">
            <input class="input join-item rounded-l-full w-4/5" placeholder="搜索你感兴趣的内容" />
            <button class="btn join-item rounded-r-full gap-0!">
              <SearchIcon/>
              搜索
            </button>
          </div>
        </div>
        <div class="navbar-end">
          <button class="btn btn-ghost text-lg">
            登录
          </button>
        </div>

      </nav>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>
