<template>
  <button v-bind="$attrs" @click="onClick">{{ text }}</button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    text: String,
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style></style>
