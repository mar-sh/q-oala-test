<template>
  <div class="page">
    <div>
      <h1>404 Not Found</h1>
      <router-link to="/">
        <span>Go Back</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
export default {
  name: 'NotFound',

  components: {
    BaseButton,
  },
};
</script>

<style>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
