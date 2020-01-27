<template>
  <div id="home">
    <message text="Vue-Webpack" />
  </div>
</template>

<script>
import Message from '@/components/Message';

export default {
  name: 'Home',
  components: {
    Message,
  },

  created() {},

  mounted() {},

  destroyed() {},

  data() {
    return {};
  },

  methods: {},

  computed: {},

  watch: {},
};
</script>

<style scoped>
#home {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
