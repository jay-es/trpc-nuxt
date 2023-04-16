<script setup lang="ts">
import type { TodoInput } from "~/server/repositories/todo/types";

const { $client, $router } = useNuxtApp();
const route = useRoute();

const todoId = Number(route.params.id);
const { data: todo, error } = await $client.todo.findOne.useQuery(todoId, {
  server: false, // クライアントからリクエストしないと、正しいエラーが表示されない
});

async function handleSubmit(input: TodoInput) {
  await $client.todo.update.mutate({ todoId, input });
  $router.push("/");
}
</script>

<template>
  <div>
    <div v-if="error" class="alert alert-error">{{ error.message }}</div>
    <TodoForm v-if="todo" :todo="todo" @submit="handleSubmit" />
  </div>
</template>
