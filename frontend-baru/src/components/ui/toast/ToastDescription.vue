<script setup>
import { ToastDescription } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <ToastDescription v-bind="props" :class="cn('text-xs opacity-80 leading-relaxed text-slate-200', props.class)">
    <slot />
  </ToastDescription>
</template>
