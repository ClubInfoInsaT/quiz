<template>
  <aside
    class="
      fixed
      top-0
      z-10
      ml-[-100%]
      flex
      h-screen
      w-full
      flex-col
      justify-between
      border-r
      transition
      duration-300
      md:w-4/12
      lg:ml-0 lg:w-[25%]
      xl:w-[20%]
      2xl:w-[15%]
    "
  >
    <div class="flex h-full flex-col justify-between">
      <div class="space-y-6 pt-8">
        <div class="flex px-6">
          <span class="h-8 w-8 rounded bg-sky-400"></span>
          <h1 class="ml-2 text-2xl font-bold">Trivial</h1>
        </div>
        <div class="px-6">
          <button
            class="
              flex
              w-full
              items-center
              rounded-lg
              bg-sky-500
              px-4
              py-3
              font-semibold
              hover:bg-sky-600
            "
          >
            <PlusCircleIcon class="h-6 w-6 text-white" strokeWidth="{2}" />
            <span class="ml-2 text-lg text-white">New quiz</span>
          </button>
        </div>
        <nav class="px-6">
          <ul class="space-y-1">
            <li v-for="sideNavItem in sidebarNavItems" :key="sideNavItem.name">
              <NuxtLink
                :href="sideNavItem.href"
                class="
                  flex
                  items-center
                  rounded-lg
                  px-3
                  py-2
                  font-medium
                  hover:bg-gray-200
                "
              >
                <component
                  :is="sideNavItem.icon"
                  class="h-6 w-6 text-gray-500"
                />
                <span class="ml-2 text-lg">{{ sideNavItem.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="space-y-6 px-4 pb-8">
        <ul class="space-y-1">
          <li v-for="sideBarItem in sideBarFooterItems" :key="sideBarItem.name">
            <NuxtLink
              v-if="sideBarItem.href"
              :href="sideBarItem.href"
              class="
                flex
                items-center
                rounded-lg
                px-3
                py-2
                font-medium
                hover:bg-gray-200
              "
            >
              <component :is="sideBarItem.icon" class="h-6 w-6 text-gray-500" />
              <span class="ml-2 text-lg">{{ sideBarItem.name }}</span>
            </NuxtLink>
            <button
              v-else
              @click="sideBarItem.onClick"
              class="
                w-full
                flex
                items-center
                rounded-lg
                px-3
                py-2
                font-medium
                hover:bg-gray-200
              "
            >
              <component :is="sideBarItem.icon" class="h-6 w-6 text-gray-500" />
              <span class="ml-2 text-lg">{{ sideBarItem.name }}</span>
            </button>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { FunctionalComponent } from "vue";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  Cog8ToothIcon,
  FolderIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";

type sideBarItem = {
  name: string;
  href?: string;
  onClick?: () => void;
  icon: FunctionalComponent;
};

defineComponent({
  components: {
    ArrowRightOnRectangleIcon,
    HomeIcon,
    Cog8ToothIcon,
    FolderIcon,
    PlusCircleIcon,
  },
});

const supabase = useSupabaseAuthClient();
const router = useRouter();

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }

  router.push("/");
};

const sideBarFooterItems: sideBarItem[] = [
  {
    name: "Settings",
    href: "/settings",
    icon: Cog8ToothIcon,
  },
  {
    name: "Logout",
    onClick: logout,
    icon: ArrowRightOnRectangleIcon,
  },
];

const sidebarNavItems: sideBarItem[] = [
  {
    name: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    name: "Library",
    href: "/library",
    icon: FolderIcon,
  },
];
</script>
