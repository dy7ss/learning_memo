<script setup>
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <router-link to="/">Hello</router-link>　
  <router-link to="/edit">Edit</router-link>　
  <router-link to="/insert">Insert</router-link>　
  <router-link to="/general">General</router-link>　
  <!-- <HelloWorld msg="Vue3 + axios!" /> -->

  <router-view />
</template>
