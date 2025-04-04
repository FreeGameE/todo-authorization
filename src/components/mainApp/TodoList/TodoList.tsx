import { Status, Todo } from "../../../types/todos";
import { useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";

type TodoListProps = {
  filteredTodoStatus: Status;
  todosData: Todo[];
  loading: boolean;
  loadTodoList: () => Promise<void>;
};

const TodoList: React.FC<TodoListProps> = ({
  filteredTodoStatus,
  todosData,
  loading,
  loadTodoList,
}) => {
  useEffect(() => {
    loadTodoList();
  }, [filteredTodoStatus, loadTodoList]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadTodoList();
    }, 5000);
    return () => clearInterval(interval); // сбросить счётчик
  }, [filteredTodoStatus, loadTodoList]);

  return (
    <div>
      {loading ? (
        <p style={{ textAlign: "center" }}>Загрузка...</p>
      ) : (
        todosData.map((todo) => {
          return (
            <div key={`div${todo.id}`}>
              <TodoItem key={todo.id} todo={todo} loadTodoList={loadTodoList} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default TodoList;
