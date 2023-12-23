<template>
  <div class="mt-20">
    <BaseCard>
      <h5 class="text-gray-500 text-lg py-4 px-2 font-roboto font-semibold">
        Personal Information
      </h5>
      <BaseCropperModal
        v-if="showModal"
        :minAspectRatioProp="{ width: 8, height: 8 }"
        :maxAspectRatioProp="{ width: 8, height: 8 }"
        @croppedImageData="setCroppedImageData"
        @showModal="showModal = false"
        :closeModal="closeModal"
      />
      <div class="px-2 pt-2 pb-4">
        <div
          class="relative border border-spacing-2 bg-gray-100 w-36 h-36 rounded-full flex justify-center items-center text-4xl tracking-wide font-roboto font-semibold text-gray-500"
        >
          <img
            v-if="hasProfilePic"
            :src="image"
            alt="user profile pic"
            class="w-full rounded-full"
          />
          <span v-else>{{ getInitials }}</span>
          <button
            @click="showModal = true"
            class="absolute bg-slate-600 p-2 rounded-full bottom-2 right-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.0"
              stroke="currentColor"
              class="w-5 h-5 text-gray-50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr />
      <div class="px-2 pt-2 pb-8">
        <div class="grid grid-auto-fit gap-3">
          <div>
            <BaseInput
              label="First Name"
              placeholder="Enter First Name"
              type="text"
              class="w-full"
              :modalInput="true"
              v-model="firstname"
            />
            <span
              v-if="v$.firstname.$errors.length > 0"
              class="text-red-500 text-sm pl-4"
            >
              {{ v$.firstname.$errors[0].$message }}
            </span>
          </div>
          <div>
            <BaseInput
              label="Last Name"
              placeholder="Enter Last Name"
              type="text"
              class="w-full"
              :modalInput="true"
              v-model="lastname"
            />
            <span
              v-if="v$.lastname.$errors.length > 0"
              class="text-red-500 text-sm pl-4"
            >
              {{ v$.lastname.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div>
          <BaseInput
            label="Email Address"
            placeholder="Enter Your email"
            type="email"
            class="w-full"
            :modalInput="true"
            v-model="email"
          />
          <span
            v-if="v$.email.$errors.length > 0"
            class="text-red-500 text-sm pl-4"
          >
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div>
          <BaseInput
            label="Phone Number"
            placeholder="Enter Your Number"
            type="email"
            class="w-full"
            :modalInput="true"
            v-model="phone"
          />
          <span
            v-if="v$.phone.$errors.length > 0"
            class="text-red-500 text-sm pl-4"
          >
            {{ v$.phone.$errors[0].$message }}
          </span>
        </div>
        <div class="py-6">
          <button
            @click="updateAdminDetails"
            :disabled="v$.$invalid"
            class="bg-tegbale-blue text-white font-medium font-roboto py-2 px-16 w-full md:max-w-fit rounded-3xl hover:bg-blue-900"
            :class="
              v$.$invalid
                ? 'cursor-not-allowed bg-gray-300 hover:bg-gray-300'
                : 'bg-tegbale-blue hover:bg-blue-900'
            "
          >
            <p class="flex items-center" v-if="isLoading">
              <svg
                class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </p>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "@/components/BaseComponents/BaseCard.vue";
import BaseCropperModal from "@/components/BaseComponents/BaseCropperModal.vue";
import BaseInput from "@/components/BaseComponents/BaseInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { onMounted, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast-store";

const hasProfilePic = ref(null);
const isLoading = ref(false);
const showModal = ref(false);
const firstname = ref(null);
const lastname = ref(null);
const email = ref(null);
const phone = ref(null);
let imageData = null;
let image = ref(null);
const userStore = useAuthStore();
const router = useRouter();
const toastStore = useToastStore();

const rules = {
  firstname: {
    required: helpers.withMessage("This field is required", (v) => !!v),
  },
  lastname: {
    required: helpers.withMessage("This field is required", (v) => !!v),
  },
  email: {
    required: helpers.withMessage("This field is required", (v) => !!v),
    email: helpers.withMessage("Please enter a valid email", (v) => !!v),
  },
  phone: {
    required: helpers.withMessage("This field is required", (v) => !!v),
  },
};

// computed properties to get the initials of the user
const getInitials = computed(() => {
  if (userStore.firstname && userStore.lastname) {
    return `${userStore.firstname[0]}${userStore.lastname[0]}`;
  }
  return null;
});

//validate the login data...
const v$ = useVuelidate(rules, { firstname, lastname, email, phone });

onMounted(() => {
  firstname.value = userStore.firstname || null;
  lastname.value = userStore.lastname || null;
  email.value = userStore.email || null;
  phone.value = userStore.phone || null;
  image.value = userStore.photo || null;

  if (image.value) {
    hasProfilePic.value = true;
  } else {
    hasProfilePic.value = false;
  }
});

// function to set cropped image data
const setCroppedImageData = (data) => {
  imageData = data;
  image.value = data.imageURL;
  hasProfilePic.value = true;
};

// function to close modal
const closeModal = () => {
  showModal.value = false;
};

// update user(admin) details
const updateAdminDetails = async () => {
  isLoading.value = true;

  let data = new FormData();
  data.append("firstname", firstname.value);
  data.append("lastname", lastname.value);
  data.append("email", email.value);
  data.append("phone", phone.value);
  data.append("photo", imageData.file);

  const result = await v$.value.$validate();
  if (result) {
    try {
      // update profile details
      await userStore.updateUserDetail(data);
      // fetch updated user details
      await userStore.fetchUserDetails();
      // redirect to dashboard
      router.push({ name: "adminDashboard" });
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Updated!",
        message: "Your details updated successfully",
        type: "success",
        timeout: 3000,
      });
    } catch (error) {
      //errors.value = error.response?.data.errors;
      console.log(error);
      // call the toast store to show the toast
      toastStore.showToast({
        title: "Ooops!",
        message: "Your details Update was Unsuccessful",
        type: "error",
        timeout: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
