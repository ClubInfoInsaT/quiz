<template>
  <div class="">
    <div class="space-y-8 pt-8 pb-12">
      <!-- Header -->
      <div class="flex items-center justify-between gap-4 px-8">
        <div>
          <h1 class="text-4xl font-bold">Your cards</h1>
          <p class="text-gray-500"></p>
        </div>
      </div>
      <!-- Content -->
      <section class="flex gap-8">
        <!-- Quiz info -->
        <div class="w-1/3 border-r">
          <div class="p-8">
            <h2 class="text-xl font-bold" v-if="quiz?.name">{{ quiz.name }}</h2>
            <p class="text-gray-500" v-if="quiz?.creator">
              Created by {{ quiz.creator }}
            </p>
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
                Lancer une partie
              </button>
            </div>
            <hr class="my-4" />
            <!-- Image -->
            <div class="h-64 w-full bg-sky-100 rounded-2xl"></div>
            <!-- Data -->
            <div class="space-y-4 mt-8">
              <div class="flex">
                <div class="flex-1" v-if="quiz?.questions">
                  <p class="text-gray-500">Questions</p>
                  <p class="text-2xl font-bold">{{ quiz.questions.length }}</p>
                </div>
                <div class="flex-1">
                  <p class="text-gray-500">Duration</p>
                  <p class="text-2xl font-bold">{{ totalDuration }}s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Questions -->
        <div class="w-2/3">
          <div class="p-8">
            <h2 class="text-2xl font-bold">Questions</h2>
            <hr class="my-4" />
          </div>
          <div class="flex flex-col gap-4" v-if="quiz?.questions">
            <div
              v-for="question in quiz.questions"
              :key="question.question"
              class="px-8"
            >
              <!-- Show question with proposition along with the right answer -->
              <div class="flex items-center justify-between">
                <div class="flex gap-4">
                  <div class="flex flex-col gap-2">
                    <p class="text-xl font-bold">{{ question.question }}</p>
                    <div class="flex flex-col gap-2">
                      <div
                        v-for="proposition in question.propositions"
                        :key="proposition"
                        class="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          :value="proposition"
                          :checked="proposition === question.answer"
                          disabled
                        />
                        <p>{{ proposition }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Question, Quiz } from "~/types";
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

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const { id } = useRoute().params;
const quiz = ref<Quiz>();

const fetchQuizInfo = async () => {
  const { data, error } = await supabase
    .from("quizz")
    .select("*")
    .eq("id", id)
    .single();

  // TODO: Handle error
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

definePageMeta({
  layout: "dashboard",
});
</script>
