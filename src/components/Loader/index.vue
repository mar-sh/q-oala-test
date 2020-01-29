<template>
  <p>{{ content }}</p>
</template>

<script>
/**
 * @name Loader propTypes.
 * @type {propTypes}
 * @param {String} text Text content to show, default to Loading
 * @property {Number} speed Animation interval speed, default to 200ms
 * @description Loader with simple animation
 */

export default {
  name: 'Loader',

  props: {
    text: {
      type: String,
      default: 'Loading',
    },
    speed: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      loaderInterval: () => undefined,
      content: this.text,
    };
  },

  mounted() {
    this.loaderInterval = window.setInterval(() => {
      if (this.content === this.text + '...') {
        this.content = this.text;
      } else {
        this.content += '.';
      }
    }, this.speed);
  },

  destroyed() {
    window.clearInterval(this.loaderInterval);
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  font-weight: bold;
}

@media (min-width: 780px) {
  p {
    font-size: 24px;
  }
}
</style>
