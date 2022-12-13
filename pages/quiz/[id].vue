<template>
  <div class="">
    <div class="space-y-8 pt-8 pb-12">
      <!-- Header -->
      <div class="px-8 bg-white xl:fixed">
        <h1 class="text-4xl font-bold">Aperçu du quiz</h1>
      </div>
      <!-- Content -->
      <section class="flex flex-col xl:flex-row gap-8">
        <!-- Quiz info -->
        <div class="xl:w-1/3 border-r">
          <div class="p-8 xl:sticky xl:top-20">
            <h1 class="text-2xl font-bold mb-4">Informations</h1>
            <h2 class="text-lg font-semibold" v-if="quiz?.name">
              {{ quiz.name }}
            </h2>
            <p class="text-gray-500 text-sm" v-if="quiz?.description">
              {{ quiz.description }}
            </p>
            <!-- Image Placeholder -->
            <div class="h-64 w-full bg-sky-100 rounded-2xl mt-2 mb-4"></div>
            <!-- Action buttons -->
            <div class="flex items-center justify-between mt-4 gap-4">
              <button
                class="
                  w-full
                  border
                  px-3
                  py-2
                  rounded-lg
                  bg-sky-500
                  hover:bg-sky-600
                  text-white
                  flex
                  justify-center
                  items-center
                  gap-2
                "
              >
                <PencilIcon class="w-6 h-6" />
                Modifier
              </button>
              <button
                class="w-full border px-3 py-2 rounded-lg hover:bg-gray-200"
              >
                Jouer
              </button>
            </div>
            <hr class="my-4" />
            <!-- Data -->
            <div class="space-y-4 mt-8" v-if="quiz">
              <div class="flex">
                <div class="flex-1">
                  <p class="text-gray-500">Questions</p>
                  <p class="text-2xl font-bold">{{ quiz.questions.length }}</p>
                </div>
                <div class="flex-1">
                  <p class="text-gray-500">Durée totale estimée</p>
                  <p class="text-2xl font-bold">{{ totalDuration }}s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Questions -->
        <div class="xl:w-2/3">
          <div class="p-8">
            <h2 class="text-2xl font-bold">Questions</h2>
            <hr class="mt-4" />
          </div>
          <div class="space-y-4 px-8" v-if="quiz?.questions.length">
            <div
              v-for="question in quiz.questions"
              :key="question.question"
              class="flex flex-col gap-2"
            >
              <p class="text-xl font-bold">{{ question.question }}</p>
              <div
                v-for="proposition in question.propositions"
                :key="proposition"
                class="space-x-4"
              >
                <input
                  type="radio"
                  :value="proposition"
                  :checked="proposition === question.answer"
                  disabled
                />
                <label>{{ proposition }}</label>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center h-full" v-else>
            <div class="text-gray-500 text-xl">Aucune question</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Quiz } from "~/types";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

defineComponent({
  components: {
    PencilIcon,
    PlusCircleIcon,
    TrashIcon,
  },
});

definePageMeta({
  layout: "dashboard",
});

const supabase = useSupabaseClient();
const { id } = useRoute().params;
const quiz = ref<Quiz>();

const fetchQuizInfo = async () => {
  const { data, error } = await supabase
    .from("quizz")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    const nuxtError = createError({
      statusCode: 404,
      message: "The quiz you are looking for does not exist.",
      statusMessage: "Quiz not found",
    });
    showError(nuxtError);
  }
  if (data) {
    quiz.value = data;
  }
};

onMounted(() => {
  fetchQuizInfo();
});

const totalDuration = computed(() =>
  quiz.value
    ? quiz.value.questions.reduce((acc, question) => acc + question.duration, 0)
    : 0
);
</script>
