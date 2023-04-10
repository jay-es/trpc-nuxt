<script setup lang="ts">
import type { Todo, TodoInput } from "~/lib/todo";

const props = defineProps<{
  todo?: Todo;
}>();

defineEmits<{
  (event: "submit", formData: TodoInput): void;
}>();

const formData = reactive<TodoInput>({
  title: props.todo?.title ?? "",
});
</script>

<template>
  <form @submit.prevent="$emit('submit', formData)">
    <div class="form-control mb-8">
      <label class="label">TITLE</label>
      <input v-model="formData.title" class="input input-bordered" required />
    </div>
    <button class="btn btn-primary">Submit</button>
  </form>
</template>
