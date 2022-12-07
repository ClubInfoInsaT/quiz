<template>
  <div
    class="mt-32 flex flex-col justify-center items-center px-8 md:px-0 gap-12"
  >
    <!-- Heading -->
    <div class="flex flex-col items-center gap-6">
      <EnvelopeOpenIcon class="h-14 w-14" />
      <div class="text-center">
        <h1 class="test-2xl font-extrabold md:text-4xl">
          Email de vérification envoyé
        </h1>
        <p class="mt-4 text-gray-600">
          Merci de cliquer sur le lien qui vient de vous être envoyé sur votre
          boîte mail pour vérifier votre compte.
        </p>
      </div>
    </div>
    <!-- Actions -->
    <NuxtLink
      to="/"
      class="
        rounded-lg
        px-4
        py-3
        font-bold
        text-white
        bg-sky-600
        hover:bg-sky-700
      "
    >
      Revenir à la page d'accueil
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { EnvelopeOpenIcon } from "@heroicons/vue/24/outline";
</script>
