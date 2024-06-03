<script setup lang="ts">
import { ref } from 'vue';
import { useComposition } from "@/composition";


const userId = ref('');
const password = ref('');

const { auth_register } = useComposition();

const register_button = () => {
  console.log('User ID:', user_id.value);
  console.log('Password:', password.value);
  auth_register(user_id.value, password.value)

};
</script>

<template>
<div>hello world</div>


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
    <input type="button" value="Subscribe!" @click="register_button()"/>
  </div>
</form>



</template>

