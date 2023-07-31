<template>
  <button :class="label" @click="onClick">{{ label }}</button>
</template>

<script>
export default {
  name: "ButtonBase",
  props: {
    label: {
      type: String,
      require: true,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

button {
  padding: 10px;
  background: $colorBlue;
  color: white;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  border-radius: 5px;

  &.Save {
    background: $colorGreen;
  }
  &.Update {
    background: $colorRed;
  }
}
</style>
