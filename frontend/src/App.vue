<script setup>

import Navbar from "@/components/navbar/Navbar.vue";
import {onMounted} from "vue";
import api from "@/js/http/api.js";
import {useUserStore} from "@/stores/user.js";
import {useRoute, useRouter} from "vue-router";

const user = useUserStore()
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const res = await api.get('api/user/account/get_user_info/')
    const data = res.data;
    if (data.result === 'success') {
      user.setUserInfo(data)
    }
  } catch (error) {
  } finally {
    user.setHasPulledInfo(true)
    if (route.meta.needLogin && !user.isLogin()) {
      await router.replace({
        name: 'user-account-login-index',
      })
    }
  }
})
</script>

<template>
  <Navbar>
    <RouterView/>
  </Navbar>
</template>

<style scoped>

</style>