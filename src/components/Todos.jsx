import Todo from "./Todo";

const Todos = ({ todos, getTodo, unclickable }) => {
  return (
    <>
      {todos.length > 0 ? (
        <div
          className={`${
            unclickable ? "pointer-events-none" : "pointer-events-auto"
          } grid grid-cols-1 divide-y p-3 bg-zinc-600 rounded-md shadow-md`}
        >
          {todos &&
            todos.map((todo) => (
              <Todo key={todo._id} todo={todo} getTodo={getTodo} />
            ))}
        </div>
      ) : (
        <h3 className="text-gray-400 text-center mt-10">No todos</h3>
      )}
    </>
  );
};

export default Todos;
