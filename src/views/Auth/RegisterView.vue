<template>
  <div
    class="place-self-center flex items-center justify-center h-screen w-full"
  >
    <BaseCard>
      <BaseLogo class="pt-8" />

      <div class="">
        <!-- <BaseInput v-model="email" type="email" id="email"> </BaseInput> -->
        <RegisterForm />
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseLogo from "../../components/BaseComponents/BaseLogo.vue";
import BaseCard from "../../components/BaseComponents/BaseCard.vue";
import RegisterForm from "./components/RegisterForm.vue";
</script>

<style lang="scss" scoped></style>
