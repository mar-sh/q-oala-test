<template>
  <h1 class="mb-2 display-5">
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'Message',
  props: {
    text: String,
  },
};
</script>

<style></style>
