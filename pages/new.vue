<script setup lang="ts">
import type { TodoInput } from "~/server/repositories/todo/types";

const { $client, $router } = useNuxtApp();

async function handleSubmit(input: TodoInput) {
  await $client.todo.add.mutate(input);
  $router.push("/");
}
</script>

<template>
  <TodoForm @submit="handleSubmit" />
</template>
