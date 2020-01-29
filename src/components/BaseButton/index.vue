<template>
  <button v-bind="$attrs" @click="onClick">{{ text }}</button>
</template>

<script>
export default {
  /**
   * @name BaseButton propTypes.
   * @type {propTypes}
   * @param {String} text Button text
   * @param {any} $attrs Any props that get assigned to this component
   * @description Base button emits click event
   */

  name: 'BaseButton',

  props: {
    text: { type: String, default: 'Click Me' },
  },

  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style></style>
