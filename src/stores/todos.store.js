import { writable } from "svelte/store";

const initalState = {
  todos: [],
  loading: false,
};

const createStore = (state) => {
  const { set, update, subscribe } = writable(state);

  const setTodos = (todos) => {
    update((st) => {
      return {
        ...st,
        todos,
      };
    });
  };

  return {
    set,
    update,
    subscribe,
    setTodos,
    reset: () => set(state),
  };
};

export default createStore(initalState);
