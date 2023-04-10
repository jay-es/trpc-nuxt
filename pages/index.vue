<script setup lang="ts">
const { $client } = useNuxtApp();

const { data: todos, refresh } = await $client.todo.list.useQuery();

function toggle(todoId: number) {
  $client.todo.toggle.mutate(todoId);
}

function remove(todoId: number) {
  if (!confirm("OK?")) return;
  $client.todo.remove.mutate(todoId);
  refresh();
}
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">ToDo List</h1>

    <p class="my-4">
      <nuxt-link href="/new" class="link link-primary">
        Create new ToDo
      </nuxt-link>
    </p>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Title</th>
            <th></th>
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
            <td>
              <button
                class="btn btn-outline btn-primary"
                @click="remove(todo.todoId)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
