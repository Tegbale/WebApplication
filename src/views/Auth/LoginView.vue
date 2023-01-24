<template>
  <div class="flex  justify-center items-center w-full h-screen">
    <BaseCard>
      <BaseLogo class="pt-8" />

      <div class="">
        <!-- <BaseInput v-model="email" type="email" id="email"> </BaseInput> -->
        <Loginform />
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseLogo from "../../components/BaseComponents/BaseLogo.vue";
import BaseCard from "../../components/BaseComponents/BaseCard.vue";
import Loginform from "@/views/Auth/components/LoginForm.vue";
</script>

<style lang="scss" scoped></style>
