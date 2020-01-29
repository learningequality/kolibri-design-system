<template>
  <div>
    <logo />
    <h1>
      Hello world
    </h1>
    <p>
      <NuxtLink to="contact">test</NuxtLink>
    </p>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style></style>
