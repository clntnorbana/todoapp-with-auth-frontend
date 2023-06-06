import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    Error("useTodosContext must be used inside a TodosContextProvider");
  }

  return context;
};
