<template>
  <section>
    <p>This page will be displayed at the /about route.</p>
    <NuxtLink to="/">Go back to the homepage</NuxtLink>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About us',
  ogTitle: 'About us',
  description: 'Trang web được xây dựng bởi hvduc.com',
  ogDescription: 'Trang web được xây dựng bởi hvduc.com',
})
</script>
