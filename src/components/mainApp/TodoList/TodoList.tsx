import TodoItem from "../TodoItem/TodoItem";
import { TodoListProps } from "../../../types/todos";
import { useEffect } from "react";

const TodoList: React.FC<TodoListProps> = ({
  filteredTodoStatus,
  todosData,
  loading,
  setLoading,
  loadTodoList,
}) => {
  useEffect!(() => {
    setLoading(true);
    loadTodoList();
  }, [filteredTodoStatus]);

  useEffect!(() => {
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
              <TodoItem
                key={data.id}
                id={data.id}
                todosData={todosData}
                loadTodoList={loadTodoList}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoList;
