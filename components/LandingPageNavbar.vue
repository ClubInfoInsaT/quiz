<template>
  <nav class="flex items-center justify-between p-6">
    <div class="flex items-center gap-10">
      <NuxtLink to="/" class="flex items-center">
        <span class="h-8 w-8 rounded bg-sky-600"></span>
        <h1 class="ml-2 text-2xl font-bold">Trivial</h1>
      </NuxtLink>

      <ul class="hidden justify-center gap-4 md:flex lg:gap-8">
        <li class="font-semibold text-gray-500 hover:text-sky-600">
          <NuxtLink to="#">Link 1</NuxtLink>
        </li>

        <li class="font-semibold text-gray-500 hover:text-sky-600">
          <NuxtLink to="#">Link 2</NuxtLink>
        </li>

        <li class="font-semibold text-gray-500 hover:text-sky-600">
          <NuxtLink to="#">Link 3</NuxtLink>
        </li>

        <li class="font-semibold text-gray-500 hover:text-sky-600">
          <NuxtLink to="#">Link 4</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="hidden items-center gap-3 md:flex">
      <NuxtLink
        to="/login"
        class="
          px-3
          py-2
          font-bold
          text-sky-600
          hover:rounded-lg hover:bg-sky-100
        "
      >
        Connexion
      </NuxtLink>
      <NuxtLink
        to="/register"
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
        S&apos;enregistrer
      </NuxtLink>
    </div>

    <div class="flex md:hidden">
      <button class="rounded-lg p-2 hover:bg-sky-100" type="button">
        <Bars3Icon class="h-6 w-6" />
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/outline";

export default {
  components: {
    Bars3Icon,
  },
};
</script>
