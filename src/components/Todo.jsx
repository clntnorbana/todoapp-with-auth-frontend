import { LuDelete, LuEdit } from "react-icons/lu";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Todo = ({ todo, getTodo }) => {
  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  //   DELETE TODO
  const deleteTodo = async () => {
    if (!user) return;

    const response = await fetch(
      `http://localhost:8000/api/todos/${todo._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: data });
    }
  };

  return (
    <div className="p-2 flex justify-between items-center">
      <h3 className="text-lg">{todo.title}</h3>
      <div className="flex gap-1">
        <button type="button" onClick={() => getTodo(todo)}>
          <LuEdit className="text-lg text-blue-300 hover:text-blue-500" />
        </button>
        <button type="button" onClick={deleteTodo}>
          <LuDelete className="text-xl text-red-300 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default Todo;
