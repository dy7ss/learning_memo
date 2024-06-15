<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useComposition } from "@/composition";
import { useAuthStore } from '@/stores/auth';

const userId = ref('');
const password = ref('');

const { login } = useComposition();

const authStore = useAuthStore();

const login_button = async () => {
  console.log('User ID:', user_id.value);
  console.log('Password:', password.value);
  const result = await login(user_id.value, password.value)
  console.log("login result:", result.data)
  authStore.set_token(result.data)

};


onMounted(async () => {
  await authStore.init_store()
})

</script>

<template>
<div>login page</div>


<form >
  <div class="form-example">
    <label for="name">ユーザID</label>
    <input type="text" name="user_id" id="user_id" v-model="user_id" required />
  </div>
  <div class="form-example">
    <label for="email">パスワード</label>
    <input type="password" name="password" id="password" v-model="password" required />
  </div>
  <div class="form-example">
    <input type="button" value="Subscribe!" @click="login_button()"/>
  </div>
</form>



</template>

