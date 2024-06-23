<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useComposition } from "@/composition";
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const userId = ref('');
const password = ref('');

const { login } = useComposition();

const authStore = useAuthStore();
const router = useRouter();

const login_button = async () => {
  console.log('User ID:', userId.value);
  console.log('Password:', password.value);
  const result = await login(userId.value, password.value)
  console.log("login result:", result.data)

  if (result.data.result) {
    router.push('/');
    authStore.set_token(result.data)
  }

};


onMounted(async () => {
  await authStore.init_store()
})

</script>

<template>
  <h1>ログイン</h1>

  <link rel="stylesheet" type="text/css" href="login.css" />
  <div class="login-container">
    <div class="item">
      <form>
        <p class="fsize">ログイン画面</p>
        <input type="text" placeholder="Username" name="user_id" id="user_id" v-model="userId"  required/>
        <input type="password" placeholder="Password"  name="password" id="password" v-model="password" required />
        <button type="button"  @click="login_button()">ログイン</button>
      </form>
    </div>
    <div class="item">
      <form>
        <p class="fsize">はじめての方はこちら</p>
        <button type="button" >新規登録</button>
      </form>
    </div>
  </div>



</template>
