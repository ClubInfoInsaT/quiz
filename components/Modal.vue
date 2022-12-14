<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onClose" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                w-full
                max-w-md
                transform
                overflow-hidden
                rounded-xl
                bg-white
                text-left
                align-middle
                shadow-xl
                transition-all
                p-6
              "
            >
              <DialogTitle class="text-lg font-semibold text-gray-900">
                <slot name="title" />
              </DialogTitle>
              <slot name="description" />
              <div class="mt-4">
                <slot name="content" />
              </div>

              <div class="mt-6">
                <div class="flex md:flex-row flex-col-reverse gap-3">
                  <slot name="actions" />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import { FlagIcon, XMarkIcon } from "@heroicons/vue/24/outline";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const { isOpen, onClose } = defineProps<Props>();
</script>
