<script setup>
import { ToastViewport } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <ToastViewport
    v-bind="props"
    :class="
      cn(
        'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]',
        props.class
      )
    "
  />
</template>
