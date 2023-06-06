import { useEffect, useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

import Todos from "../components/Todos";
import FormTodo from "../components/FormTodo";
import Edit from "../components/Edit";

const Home = () => {
  const [editForm, setEditForm] = useState(false);

  const { todos, dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const [editTodo, setEditTodo] = useState("");

  // FETCH TODOS
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://todoapp-api-l6hu.onrender.com/api/todos",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_TODOS", payload: data });
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  const getTodo = (todo) => {
    setEditTodo(todo);
    setEditForm(true);
  };

  return (
    <div>
      <FormTodo />
      {editForm && (
        <Edit editTodo={editTodo} closeForm={() => setEditForm(false)} />
      )}
      <Todos todos={todos} getTodo={getTodo} unclickable={editForm} />
    </div>
  );
};

export default Home;
