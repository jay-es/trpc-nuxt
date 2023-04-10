<script setup lang="ts">
import type { TodoInput } from "~/lib/todo";

const { $client, $router } = useNuxtApp();

const formData = reactive<TodoInput>({
  title: "",
});

async function handleSubmit() {
  await $client.todo.add.mutate(formData);
  $router.push("/");
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-control mb-8">
      <label class="label">TITLE</label>
      <input v-model="formData.title" class="input input-bordered" required />
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>
