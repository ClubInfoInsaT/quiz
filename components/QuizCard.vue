<template>
  <NuxtLink :to="quizUrl">
    <div className="group w-64 space-y-2 rounded-lg">
      <img
        src="https://images.unsplash.com/photo-1669593926202-5812c913864d"
        alt=""
        className="rounded-lg"
      />

      <div className="flex items-center py-1">
        <img
          :src="authorImage"
          alt=""
          className="h-6 w-6 transform rounded-full md:h-10 md:w-10"
        />
        <div className="ml-2 w-full">
          <h1
            className="text-sm font-bold group-hover:text-sky-500 md:text-base"
          >
            {{ quiz.name }}
          </h1>
          <p className="text-xs text-gray-500 md:text-sm">
            {{ quiz.description ?? "No description" }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { Quiz } from "~/types";

interface Props {
  quiz: Quiz;
}

const { quiz } = defineProps<Props>();

const authorImage = computed(() => {
  return `https://avatars.dicebear.com/api/avataaars/${quiz.creator}.svg`;
});

const quizUrl = computed(() => {
  return `/quiz/${quiz.id}`;
});
</script>
