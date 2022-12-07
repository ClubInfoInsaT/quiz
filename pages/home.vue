<template>
  <div class="h-screen">
    <div class="space-y-8 pt-8 pb-12">
      <div class="flex items-center justify-between gap-4 px-8">
        <div>
          <h1 class="text-4xl font-bold">Welcome back, username</h1>
          <p class="text-gray-500">
            You have 3 quizzes in progress, 2 quizzes to review and 1 quiz to
            take.
          </p>
        </div>
        <div class="flex gap-3">
          <button
            class="
              flex
              items-center
              gap-2
              rounded-lg
              border-2 border-gray-300
              px-4
              py-3
              font-semibold
              text-gray-800
              hover:bg-gray-100
            "
          >
            <PlusCircleIcon class="h-6 w-6" />
            <span>New quiz</span>
          </button>
        </div>
      </div>
      <section class="px-8">
        <h3 class="pb-4 text-xl font-semibold">Quizzes from DB</h3>
        <div class="hide-scroll-bar flex overflow-x-scroll">
          <div class="flex gap-8">
            <QuizCard v-for="quiz in quizzes" :quiz="quiz" :key="quiz.name" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
import { Quiz } from "~/types";

defineComponent({
  components: {
    ChevronRightIcon,
    PlusCircleIcon,
  },
  data: () => ({ quizzes: [] }),
});

definePageMeta({
  layout: "dashboard",
});

onMounted(() => {
  getQuizzes();
});

const supabase = useSupabaseAuthClient();

const quizzes = ref<Quiz[]>();

const getQuizzes = async () => {
  const { data, error } = await supabase.from("quizz").select("*");

  if (error) {
    console.log(error);
  }

  quizzes.value = data as Quiz[];
};
</script>
