import { GrAdd } from "react-icons/gr";
import { useTodosContext } from "../hooks/useTodosContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const FormTodo = () => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");

  //   ADD TODO
  const addTodo = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const todo = { title };

    const response = await fetch("http://localhost:8000/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_TODO", payload: data });
      setTitle("");
    }
  };

  return (
    <form className="flex gap-1 mb-3" onSubmit={addTodo}>
      <input
        type="text"
        className="bg-zinc-500 focus:ring rounded-md p-2 w-full focus:bg-zinc-600 focus:outline-none pl-4 text-sm text-gray-300"
        placeholder="Add new todo"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <button
        type="submit"
        className="bg-zinc-400 px-3 py-3 rounded-full hover:bg-zinc-600 shadow-sm"
      >
        <GrAdd className="text-sm" />
      </button>
    </form>
  );
};

export default FormTodo;
