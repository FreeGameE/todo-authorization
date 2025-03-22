import { ChangeListProps } from "../../../types/todos";
import { Button } from "antd";
import "./ChangeList.css";

const ChangeList: React.FC<ChangeListProps> = ({
  setFilteredTodoStatus,
  filteredTodoStatus,
  todosInfo,
}) => {
  const handleFilterChange = (filter: "all" | "completed" | "inWork") => {
    setFilteredTodoStatus(filter);
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
