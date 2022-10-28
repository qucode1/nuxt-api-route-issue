<template>
  <div class="flex flex-col gap-2 p-2">
    <Title>API Problems</Title>

    <nav class="flex gap-2 mb-6">
      <NuxtLink active-class="text-blue" class="hover:text-blue-700" to="/">
        Home
      </NuxtLink>
      <NuxtLink active-class="text-blue" class="hover:text-blue-700" to="/login">
        Login
      </NuxtLink>
    </nav>
    <slot />
  </div>
</template>
