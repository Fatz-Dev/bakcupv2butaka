<script setup>
import { ToastTitle } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <ToastTitle v-bind="props" :class="cn('text-sm font-bold tracking-tight text-white', props.class)">
    <slot />
  </ToastTitle>
</template>
