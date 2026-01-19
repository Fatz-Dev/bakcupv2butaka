<script setup>
import { ToastProvider } from "radix-vue";
import { useToast } from "./use-toast";
import Toast from "./Toast.vue";
import ToastClose from "./ToastClose.vue";
import ToastDescription from "./ToastDescription.vue";
import ToastTitle from "./ToastTitle.vue";
import ToastAction from "./ToastAction.vue";
import ToastViewport from "./ToastViewport.vue";

const { toasts } = useToast();
</script>

<template>
  <ToastProvider>
    <Toast
      v-for="{ id, title, description, action, ...props } in toasts"
      :key="id"
      v-bind="props"
    >
      <div class="grid gap-1">
        <ToastTitle v-if="title">
          {{ title }}
        </ToastTitle>
        <ToastDescription v-if="description">
          {{ description }}
        </ToastDescription>
      </div>
      <template v-if="action">
        <ToastAction :alt-text="action.altText">
          {{ action.label }}
        </ToastAction>
      </template>
      <ToastClose />
    </Toast>
    <ToastViewport />
  </ToastProvider>
</template>
