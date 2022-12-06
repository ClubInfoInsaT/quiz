<template>
  <section class="py-20">
    <div class="text-center px-6 md:px-0">
      <h1 class="text-4xl font-extrabold md:text-6xl">Trivial</h1>
      <p class="mt-4 text-xl text-gray-600">
        Dolor Lorem laborum incididunt dolor nulla et pariatur irure consequat
        tempor incididunt Lorem non.
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <a
          href="#games"
          class="
            px-3
            py-2
            font-bold
            text-sky-600
            hover:rounded-lg hover:bg-sky-100
          "
        >
          <span>jouer</span>
        </a>
        <button
          class="
            rounded-lg
            bg-sky-600
            px-3
            py-2
            font-bold
            text-white
            hover:bg-sky-700
          "
        >
          <span>Plus d'info</span>
        </button>
      </div>

      <div class="mt-10 mx-auto h-96 w-3/4 md:h-[500px] md:w-1/2">
        <img class="rounded-lg" src="https://picsum.photos/900/700" alt="" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ArrowRightIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";

defineComponent({
  components: {
    ArrowRightIcon,
    PlusCircleIcon,
  },
});
</script>
