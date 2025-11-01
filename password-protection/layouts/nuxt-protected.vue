<script setup lang="ts">
useHead({
  title: 'This website is password protected!'
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
