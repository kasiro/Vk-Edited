<template>
  <div class="container">
    <span>What about events?</span>
    <button class="action" @click.stop="clicked">send event!</button>
  </div>
</template>

<script>
export default {
  methods: {
    clicked() {
      this.$emit("myClick");
    }
  }
};
</script>