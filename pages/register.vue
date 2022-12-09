<template>
  <div class="container mx-auto max-w-screen-md">
    <div class="space-y-4">
      <div class="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          class="rounded-lg border border-gray-500 px-2 py-1 outline-none"
          @change="setEmail($event)"
        />
      </div>

      <div class="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          class="rounded-lg border border-gray-500 px-2 py-1 outline-none"
          @change="setPassword($event)"
        />
      </div>

      <button
        class="
          rounded
          bg-blue-500
          px-4
          py-3
          font-bold
          text-white
          hover:bg-blue-600
        "
        @click="register"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "landing",
});

const client = useSupabaseAuthClient();
const router = useRouter();

const email = ref("");
const password = ref("");

const setEmail = (event: Event) => {
  email.value = (event.target as HTMLInputElement).value;
};

const setPassword = (event: Event) => {
  password.value = (event.target as HTMLInputElement).value;
};

const register = async () => {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.log(error);
  }

  if (data.user) router.push("/email-verification");
};
</script>
