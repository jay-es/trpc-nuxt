<script setup lang="ts">
import type { TodoInput } from "~/server/repositories/todo/types";

const { $client, $router } = useNuxtApp();
const route = useRoute();

const todoId = Number(route.params.id);
const { data: todo } = await $client.todo.findOne.useQuery(todoId);

async function handleSubmit(input: TodoInput) {
  await $client.todo.update.mutate({ todoId, input });
  $router.push("/");
}
</script>

<template>
  <TodoForm :todo="todo ?? undefined" @submit="handleSubmit" />
</template>
