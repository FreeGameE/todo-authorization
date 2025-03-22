import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import ChangeList from "../ChangeList/ChangeList";
import TodoList from "../TodoList/TodoList";
import { getData} from "../../../api/todosApi";
import {Todo, TodoInfo} from "../../../types/todos"

const TodoListPage: React.FC = () => {
  const [filteredTodoStatus, setFilteredTodoStatus] = useState<"all" | "completed" | "inWork">("all");
  const [todosData, setTodosData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [todosInfo, setTodosInfo] = useState<TodoInfo>({ all: 0, completed: 0, inWork: 0 });

  const loadTodoList = async () => {
    try {
      const response = await getData(filteredTodoStatus);
      const newData: Todo[] = response!.data;
      setTodosData((prevTodos) => {
        const updatedTodos = newData.map((newTodo: Todo) => {
          const existingTodo = prevTodos.find((todo) => todo.id === newTodo.id);

          return existingTodo ? { ...existingTodo, ...newTodo } : newTodo;
        });
        return updatedTodos;
      });
      setTodosInfo(response!.info)
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-list-page">
      <header>СПИСОК ЗАДАЧ</header>
      <section className="main-board">
        <AddTodo loadTodoList={loadTodoList} filteredTodoStatus={filteredTodoStatus}/>
        <ChangeList
          setFilteredTodoStatus={setFilteredTodoStatus}
          filteredTodoStatus={filteredTodoStatus}
          loadTodoList={loadTodoList}
          todosInfo={todosInfo}
          setTodosInfo={setTodosInfo}
        />
        <TodoList
          filteredTodoStatus={filteredTodoStatus}
          todosData={todosData}
          setTodosData={setTodosData}
          loading={loading}
          setLoading={setLoading}
          loadTodoList={loadTodoList}
        />
      </section>
    </div>
  );
};

export default TodoListPage;
