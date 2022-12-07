<template>
  <div class="h-screen w-full md:pt-16 md:px-20 md:pb-24 py-16">
    <div
      class="flex md:flex-row flex-col gap-8 justify-center items-center h-full"
    >
      <!-- Content -->
      <div class="flex flex-col gap-12 md:px-0 px-4 w-full md:w-auto">
        <!--  Heading and support  -->
        <div class="flex flex-col md:gap-12 gap-8">
          <div class="space-y-4 max-w-xl">
            <h1 class="md:text-6xl text-4xl font-bold text-gray-800">
              {{ props.error.statusMessage }}
            </h1>
            <p class="text-xl text-gray-800">
              {{ props.error.message }}
            </p>
          </div>
        </div>

        <!--  Actions  -->
        <div class="flex gap-3 md:flex-row flex-col">
          <button
            @click="goHome"
            class="
              px-3
              py-2
              font-bold
              bg-sky-600
              text-white
              rounded-lg
              hover:bg-sky-700
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <ArrowLeftIcon class="h-5 w-5" />
            Go back
          </button>
          <button
            @click="goHome"
            class="
              px-3
              py-2
              font-bold
              text-sky-600
              hover:rounded-lg hover:bg-sky-100
            "
          >
            Take me home
          </button>
        </div>
      </div>
      <!-- Image -->
      <div class="flex h-full md:w-1/3 w-full">
        <ErrorIcon />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

type NuxtError = {
  message: string;
  statusCode: number;
  statusMessage: string;
};

interface Props {
  error: NuxtError;
}

const props = defineProps<Props>();
const router = useRouter();

const goBack = () => router.back();
const goHome = () => router.push("/");

defineComponent({
  components: {
    ArrowLeftIcon,
  },
});
</script>
