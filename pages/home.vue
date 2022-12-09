<template>
  <modal title="Create a new quiz" id="create-quiz-modal">
    <template #modal-content>
      <input
        @input="setQuizName($event)"
        v-model="quizName"
        class="w-full py-3 focus:outline-none"
        placeholder="Enter a name"
      />
    </template>
    <template #modal-actions>
      <label
        @click="quizName = ''"
        for="create-quiz-modal"
        class="px-4 py-3 rounded-lg font-bold text-red-600 hover:bg-red-100"
      >
        Annuler
      </label>
      <label
        v-if="quizName"
        @click="createQuiz"
        for="create-quiz-modal"
        class="
          px-4
          py-3
          rounded-lg
          text-white
          font-bold
          bg-sky-600
          hover:bg-sky-700
        "
      >
        Valider
      </label>
    </template>
  </modal>

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
          <label
            for="create-quiz-modal"
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
            New quiz
          </label>
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
  middleware: "auth",
});

onMounted(() => {
  getQuizzes();
});

const user = useSupabaseUser();
const supabase = useSupabaseAuthClient();
const router = useRouter();

const quizzes = ref<Quiz[]>();
const quizName = ref("");

const getQuizzes = async () => {
  const { data, error } = await supabase.from("quizz").select("*");

  if (error) {
    console.log(error);
  }

  quizzes.value = data as Quiz[];
};

const setQuizName = (event: Event) => {
  quizName.value = (event.target as HTMLInputElement).value;
};

const createQuiz = async () => {
  const userID = await user.value?.id;
  if (userID) {
    const { data, error } = await supabase
      .from("quizz")
      .insert({ name: quizName.value, creator: userID } as never)
      .select();
    if (error) {
      // TODO: Display a toast message
      console.log(error);
    }
    const quizzes = data as Quiz[];
    if (quizzes) {
      router.push({
        path: `/quiz/editor/${quizzes[0].id}`,
        params: { id: quizzes[0].id },
      });
    }
  }
};
</script>
