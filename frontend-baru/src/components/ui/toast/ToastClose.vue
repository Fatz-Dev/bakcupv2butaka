<script setup>
import { ToastClose } from "radix-vue";
import { X } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <ToastClose v-bind="props" :class="cn(
    'absolute right-2 top-2 rounded-md p-1 text-slate-50/50 opacity-0 transition-opacity hover:text-slate-50 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 dark:text-slate-50/50 dark:hover:text-slate-50',
    props.class
  )
    ">
    <X class="h-4 w-4" />
  </ToastClose>
</template>
