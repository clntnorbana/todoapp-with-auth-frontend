import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Edit = ({ editTodo, closeForm }) => {
  const [title, setTitle] = useState(editTodo.title);

  const { dispatch } = useTodosContext();
  const { user } = useAuthContext();

  const updateTodo = async (e) => {
    const response = await fetch(
      `http://localhost:8000/api/todos/${editTodo._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: data });
    }
  };

  return (
    <form
      onSubmit={updateTodo}
      className="text-gray-900 bg-zinc-500 shadow-xl p-2 rounded-md"
      style={{
        position: "fixed",
        top: "25%",
        left: "50%",
        transform: "translate(-50%)",
      }}
    >
      <input
        type="text"
        placeholder="title"
        className="bg-gray-50 p-2 focus:ring rounded-md focus:outline-none required"
        onChange={(e) => setTitle(e.target.value)}
        value={title || ""}
      />
      <div className="p-2 flex gap-2 justify-between">
        <button className="text-blue-300">Save Changes</button>
        <button type="button" className="text-gray-100" onClick={closeForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Edit;
