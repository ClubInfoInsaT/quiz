<template>
  <div class="container mx-auto max-w-screen-md">
    <div class="mt-20 mx-auto h-96 w-3/4 md:h-[500px] md:w-1/2"> 
	<h1 class = "test-2xl font-extrabold md:text-4xl"> Email de vérification envoyé </h1>
	<p class = "mt-4 text-gray-600"> 
	 Merci de cliquer sur le lien qui vient de vous être envoyé sur votre boîte mail pour vérifier votre compte. </p>
	 
      <NuxtLink to="/" class="flex items-center">
      <button
        class="
              mt-4
              flex
              rounded-lg
              border-2 border-gray-300
              px-4
              py-3
              font-bold
              text-white
	      bg-sky-600
              hover:bg-sky-700
"
        @click= "accueil"
      >
        Revenir à la page d'accueil
      </button>
      </NuxtLink>
    </div>
  </div>
</template>



