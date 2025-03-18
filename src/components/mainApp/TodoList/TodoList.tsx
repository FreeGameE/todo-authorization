import TodoItem from "../TodoItem/TodoItem";
import { getData, Todo } from "../../../api/usersApi";
import { useEffect, useState } from "react";

type TodoListProps = {
  filteredTodoStatus: "all" | "completed" | "inWork";
  todosData: Todo[];
  setTodosData: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadTodoList: () => Promise<void>;
};

const TodoList: React.FC<TodoListProps> = ({
  filteredTodoStatus,
  todosData,
  setTodosData,
  loading,
  setLoading,
  loadTodoList,
}) => {
  useEffect!(() => {
    setLoading(true);
    loadTodoList();
  }, [filteredTodoStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadTodoList();
    }, 5000);
    return () => clearInterval(interval); // сбросить счётчик
  }, [filteredTodoStatus]);

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: "center" }}>Загрузка...</p>
      ) : (
        todosData.map((data) => {
          return (
            <div key={`div${data.id}`}>
              <TodoItem key={data.id} id={data.id} todosData={todosData}/>
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoList;
