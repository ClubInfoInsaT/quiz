<template>
  <input type="checkbox" :id="props.id" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">{{ props.title }}</h3>
      <p class="py-4">
        <slot name="modal-content" />
      </p>
      <div class="modal-action">
        <slot name="modal-actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string;
  title: string;
}

const props = defineProps<Props>();
</script>
