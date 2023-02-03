<template>
  <Teleport to="body">
    <transition name="modal-outter">
      <div
        class="fixed inset-0 h-full w-full bg-black bg-opacity-40 flex justify-center items-center px-8 z-50"
      >
        <transition name="modal-inner">
          <div
            class="bg-white p-10 w-full rounded-lg max-w-sm"
            v-on-click-outside="closeModal"
          >
            <div class="w-full">
              <h3 class="text-xl font-medium leading-6 text-gray-900">
                Crop Image
              </h3>
            </div>
            <div class="w-full">
              <div class="flex flex-wrap">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  select image
                </label>
                <div class="mb-3 w-full">
                  <input
                    type="file"
                    id="image"
                    ref="fileInput"
                    @change="getUploadedImage"
                    class="form-control block w-full px-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
              <div class="flex justify-center max-w-2xl mb-3">
                <Cropper
                  ref="cropper"
                  :src="uploadedImage"
                  :stencil-props="{
                    minAspectRatio: minAspectRatioProp
                      ? minAspectRatioProp.width / minAspectRatioProp.height
                      : 8 / 8,
                    maxAspectRatio: maxAspectRatioProp
                      ? maxAspectRatioProp.width / maxAspectRatioProp.height
                      : 8 / 8,
                  }"
                  @change="change"
                ></Cropper>
              </div>
            </div>
            <div class="w-full">
              <div class="pb-3 flex flex-row-reverse">
                <button
                  @click="$emit('showModal', false)"
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent shadow-sm rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                >
                  Cancel
                </button>
                <button
                  v-if="uploadedImage"
                  @click="crop"
                  type="button"
                  class="inline-flex justify-center px-4 py-2 mx-2 text-sm font-medium text-white bg-tegbale-blue border border-transparent shadow-sm rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Crop Image
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";
import { ref, toRefs } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const emit = defineEmits(["croppedImageData", "showModal"]);

const props = defineProps({
  minAspectRatioProp: Object,
  maxAspectRatioProp: Object,
  closeModal: Function,
});

const { minAspectRatioProp, maxAspectRatioProp } = toRefs(props);

const fileInput = ref(null);
const cropper = ref(null);
const uploadedImage = ref(null);
const croppedImageData = {
  file: null,
  imageURL: null,
  height: null,
  width: null,
  left: null,
  top: null,
};

const getUploadedImage = (e) => {
  const file = e.target.files[0];

  uploadedImage.value = URL.createObjectURL(file);
};

const crop = () => {
  const { coordinates, canvas } = cropper.value.getResult();

  croppedImageData.file = fileInput.value.files[0];
  croppedImageData.imageURL = canvas.toDataURL();
  croppedImageData.height = coordinates.height;
  croppedImageData.width = coordinates.width;
  croppedImageData.top = coordinates.top;
  croppedImageData.left = coordinates.left;

  emit("croppedImageData", croppedImageData);
  emit("showModal", false);
};
</script>

<style scoped>
.modal-outter-enter-active,
.modal-outter-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.01, 0.36, 1.01);
}

.modal-outter-enter-from,
.modal-outter-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.01, 0.36, 1.01) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.01, 0.36, 1.01);
}

.modal-inner-enter-from {
  transform: scale(0.9);
  opacity: 0;
}

.modal-inner-leave-to {
  transform: scale(0.9);
}
</style>
