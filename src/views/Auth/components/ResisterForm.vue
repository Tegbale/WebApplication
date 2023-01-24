<template>
  <form @submit.prevent="HandleRegistration">
    <h3
      class="text-tegbale-blue font-bold font-roboto text-center text-4xl py-4"
    >
      Register
    </h3>
    <div class="px-4 sm:px-[2.5rem]">
      <div class="mt-6">
        <BaseInput
          v-model="Register.username"
          type="text"
          placeholder="Enter Your Username"
          class=""
          with-icon
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </template>
        </BaseInput>

        <span
          v-if="v$.username.$errors.length > 0"
          class="text-red-500 text-sm pl-4"
          >{{ v$.username.$errors[0].$message }}</span
        >
      </div>
      <div class="mt-3">
        <BaseInput
          v-model="Register.email"
          type="email"
          placeholder="Enter School Email Address"
          class=""
          with-icon
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
              />
            </svg>
          </template>
        </BaseInput>
        <span
          v-if="v$.email.$errors.length > 0"
          class="text-red-500 text-sm pl-4"
          >{{ v$.email.$errors[0].$message }}</span
        >
      </div>
      <div class="mt-3">
        <BaseInput
          v-model="Register.password"
          :type="passwordFieldType"
          :is-password="isPassword"
          placeholder="Password"
          with-icon
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </template>
          <template #password>
            <button @click.prevent="switchVisibility">
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </button>
          </template>
        </BaseInput>
        <span
          v-if="v$.password.$errors.length > 0"
          class="text-red-500 text-sm pl-4"
          >{{ v$.password.$errors[0].$message }}</span
        >
      </div>
      <div class="mt-3">
        <BaseInput
          v-model="Register.confirmPassword"
          :type="passwordFieldType"
          :is-password="isPassword"
          placeholder="Confirm Your Password"
          with-icon
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </template>
          <template #password>
            <button @click.prevent="switchVisibility">
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            </button>
          </template>
        </BaseInput>
        <span
          v-if="v$.confirmPassword.$errors.length > 0"
          class="text-red-500 text-sm pl-4"
          >{{ v$.confirmPassword.$errors[0].$message }}</span
        >
      </div>
      <div class="pb-4 text-right">
        <a
          href="#"
          class="text-tegbale-blue hover:underline text-right font-roboto leading-normal text-base"
          >Forgot Password?</a
        >
      </div>
      <div class="pb-8 sm:pb-16">
        <BaseButton
          btn-title="Sign In"
          class="text-white bg-tegbale-blue hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-sm sm:text-base w-full px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 font-roboto font-bold md:text-2xl"
          type="submit"
        >
        </BaseButton>

        <div>
          <p class="text-center text-sm sm:text-base mt-4">
            already have an account?
            <router-link to="/login" class="text-tegbale-blue hover:underline"
              >Sign In</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email,
  helpers,
} from "@vuelidate/validators";
import BaseInput from "../../../components/BaseComponents/BaseInput.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";

const Register = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

let passwordFieldType = ref("password");
let showPassword = ref(false);
let isPassword = ref(true);

const rules = computed(() => {
  return {
    username: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
      containsPasswordRequirement: helpers.withMessage(
        () =>
          `The password requires an uppercase, lowercase, number and special character`,
        (value) =>
          /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value)
      ),
    },
    confirmPassword: {
      required,
      sameAsPassword: helpers.withMessage(
        "Password does not match",
        sameAs(Register.password)
      ),
    },
  };
});
//switch password visibility
const switchVisibility = () => {
  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    showPassword.value = true;
  } else {
    passwordFieldType.value = "password";
    showPassword.value = false;
  }
};
//validate the register data...
const v$ = useVuelidate(rules, Register);
//handle user registration...
const HandleRegistration = async () => {
  const result = await v$.value.$validate();
  if (result) {
    console.log(JSON.stringify(Register, null, 2));
  }
};
</script>

<style lang="scss" scoped></style>
