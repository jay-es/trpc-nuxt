<script setup lang="ts">
const { $client } = useNuxtApp();

const { data: todos } = await $client.todo.list.useQuery();

function toggle(todoId: number) {
  $client.todo.toggle.mutate(todoId);
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">ToDo List</h1>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in todos" :key="todo.todoId">
            <td>
              <label>
                <input
                  type="checkbox"
                  class="checkbox checkbox-primary"
                  :checked="todo.completed"
                  @click="toggle(todo.todoId)"
                />
              </label>
            </td>
            <td>{{ todo.todoId }}</td>
            <td>{{ todo.title }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
