//pinia store for toast notifications with time out

import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
    state: () => ({
        toast: {
            show: false,
            title: "",
            message: "",
            type: "success",
            timeout: 3000,
        },
    }),

    actions: {
        showToast(data) {
            this.toast.show = true;
            this.toast.message = data.message;
            this.toast.type = data.type;
            this.toast.title = data.title;
            this.toast.timeout = data.timeout;
        },
        hideToast() {
            this.toast.show = false;
            this.toast.message = "";
            this.toast.type = "success";
            this.toast.title = "";
            this.toast.timeout = 3000;
        },
    },
});