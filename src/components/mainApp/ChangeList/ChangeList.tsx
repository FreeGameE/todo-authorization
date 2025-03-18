import { useEffect, useState } from "react";
import { getData, TodoInfo } from "../../../api/usersApi";
import { Button } from "antd";
import "./ChangeList.css";

type ChangeListProps = {
  setFilteredTodoStatus: React.Dispatch<React.SetStateAction<"all" | "completed" | "inWork">>;
  filteredTodoStatus: "all" | "completed" | "inWork";
  loadTodoList: () => Promise<void>;
  todosInfo: TodoInfo
  setTodosInfo: React.Dispatch<React.SetStateAction<TodoInfo>>;
};

const ChangeList: React.FC<ChangeListProps> = ({
  setFilteredTodoStatus,
  filteredTodoStatus,
  loadTodoList,
  todosInfo,
  setTodosInfo
}) => {
  

  const loadFilterFromStorage = () => {
    const savedFilter = localStorage.getItem("todoFilter");
    return savedFilter ? savedFilter : "all";
  };

  useEffect(() => {
    loadTodoList();
    // setTodosInfo(response!.info);
  }, [filteredTodoStatus]);

  useEffect!(() => {
    const savedFilter = loadFilterFromStorage() as "all" | "completed" | "inWork";;
    setFilteredTodoStatus(savedFilter);
  }, []);

  const handleFilterChange = (filter: "all" | "completed" | "inWork") => {
    setFilteredTodoStatus(filter);
    localStorage.setItem("todoFilter", filter);
  };

  return (
    <div className="todo-status" style={{ marginTop: "0" }}>
      <Button
        onClick={() => handleFilterChange("all")}
        className={filteredTodoStatus === "all" ? "active" : undefined}
      >
        Все({todosInfo?.all})
      </Button>
      <Button
        onClick={() => handleFilterChange("inWork")}
        className={filteredTodoStatus === "inWork" ? "active" : undefined}
      >
        В работе({todosInfo?.inWork})
      </Button>
      <Button
        onClick={() => handleFilterChange("completed")}
        className={filteredTodoStatus === "completed" ? "active" : undefined}
      >
        Завершённые({todosInfo?.completed})
      </Button>
    </div>
  );
};

export default ChangeList;
