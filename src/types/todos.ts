export interface TodoRequest {
  title?: string;
  isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export type TodoListProps = {
  filteredTodoStatus: "all" | "completed" | "inWork";
  todosData: Todo[];
  setTodosData: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loadTodoList: () => Promise<void>;
};

export type TodoItemProps = {
  id: number;
  todosData: Todo[];
  loadTodoList: () => Promise<void>;
};

export type ChangeListProps = {
  setFilteredTodoStatus: React.Dispatch<React.SetStateAction<"all" | "completed" | "inWork">>;
  filteredTodoStatus: "all" | "completed" | "inWork";
  loadTodoList: () => Promise<void>;
  todosInfo: TodoInfo
  setTodosInfo: React.Dispatch<React.SetStateAction<TodoInfo>>;
};

export type addTodoProps = {
  filteredTodoStatus: "all" | "completed" | "inWork";
  loadTodoList: () => Promise<void>;
};