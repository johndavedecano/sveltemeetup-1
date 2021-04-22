<script>
  import { onMount } from "svelte";
  import axios from "axios";
  import todoStore from "./stores/todos.store";

  axios.defaults.baseURL = "http://localhost:3000";

  $: todos = $todoStore.todos;

  let title = "";

  const onSubmit = () => {
    if (title) {
      axios.post("todos", { title, done: false }).then(loadTodos);
      title = "";
    }
  };

  const onDelete = (id) => {
    return () => {
      todos = todos.filter((todo) => {
        return id !== todo.id;
      });
    };
  };

  const loadTodos = () => {
    axios.get("todos").then((response) => {
      todoStore.setTodos(response.data);
    });
  };

  onMount(() => {
    loadTodos();
  });
</script>

<div class="container">
  <div class="row">
    <div class="col-md-6 mx-auto">
      <div class="card">
        <div class="card-header">Todos</div>
        <div class="card-body">
          <form action="" on:submit|preventDefault={onSubmit}>
            <div class="input-group">
              <input type="text" class="form-control" bind:value={title} />
              <button class="btn btn-outline-primary">Add</button>
            </div>
          </form>
          <ul class="list-group">
            {#each todos as todo}
              <li class="list-group-item d-flex align-items-center">
                <div class="flex-grow-1">
                  {todo.title}
                </div>
                <button
                  class="btn btn-sm btn-danger"
                  on:click={onDelete(todo.id)}>&times;</button
                >
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
