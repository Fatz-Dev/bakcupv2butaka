<script setup>
import { ToastRoot, useForwardPropsEmits } from "radix-vue";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
  variant: { type: String, default: "default" },
  open: { type: Boolean, default: true },
  defaultOpen: { type: Boolean, default: true },
  duration: { type: Number, default: 3000 },
  onOpenChange: { type: Function, required: false },
});

const emits = defineEmits([
  "update:open",
  "close",
  "pause",
  "resume",
  "swipeStart",
  "swipeMove",
  "swipeCancel",
  "swipeEnd",
]);

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-2xl transition-all backdrop-blur-md data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default:
          "border-slate-800 bg-slate-900/95 text-slate-50 border-l-4 border-l-primary-500",
        destructive:
          "group border-red-900/50 bg-red-950/95 text-slate-50 border-l-4 border-l-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const forwarded = useForwardPropsEmits(props, emits);

function handleOpenChange(open) {
  if (props.onOpenChange) {
    props.onOpenChange(open);
  }
  emits("update:open", open);
}
</script>

<template>
  <ToastRoot v-bind="forwarded" :class="cn(toastVariants({ variant: props.variant }), props.class)"
    @update:open="handleOpenChange">
    <slot />
  </ToastRoot>
</template>
