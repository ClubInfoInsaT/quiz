<template>
  <modal :is-open="isOpen" :on-close="onClose">
    <template #title>
      <h2 class="font-semibold text-xl">Créer un quiz</h2>
    </template>
    <template #description>
      <p class="text-gray-600">Veuillez donner un nom à votre quiz.</p>
    </template>
    <template #content>
      <div class="space-y-2">
        <label for="quiz-name" class="block font-medium">Nom du quiz</label>
        <input
          type="text"
          id="quiz-name"
          class="block px-3 py-2 w-full rounded-lg border border-gray-300"
          placeholder="ex: Mon Quiz"
          @input="setQuizName"
        />
      </div>
    </template>
    <template #actions>
      <button
        @click="onClose"
        class="
          w-full
          rounded-lg
          px-3
          py-2
          border border-gray-300
          hover:bg-gray-100
          font-semibold
        "
      >
        Annuler
      </button>
      <button
        @click="onClose"
        class="
          w-full
          rounded-lg
          px-3
          py-2
          bg-sky-500
          hover:bg-sky-600
          font-semibold
          text-white
        "
      >
        Créer
      </button>
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
          <button
            @click="onOpen"
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
import {
  ChevronRightIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { Quiz } from "~/types";

defineComponent({
  components: {
    ChevronRightIcon,
    PlusCircleIcon,
  },
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

// Modal state
const isOpen = ref(false);
const onOpen = () => {
  isOpen.value = true;
};
const onClose = () => {
  isOpen.value = false;
};

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

const quizNameLength = computed(() => quizName.value.length);
const isQuizNameValid = computed(
  () => quizNameLength.value <= 50 && quizNameLength.value > 0
);
</script>
