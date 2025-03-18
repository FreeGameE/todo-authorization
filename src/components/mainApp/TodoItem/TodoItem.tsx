import React, { useCallback, useEffect, useState } from "react";
import {
  Todo,
  changeData,
  TodoRequest,
  deleteData,
  getTodoById,
} from "../../../api/usersApi";
import "./TodoItem.css";
import { Button, Form } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";

type TodoItemProps = {
  id: number;
  todosData: Todo[];
};

const TodoItem: React.FC<TodoItemProps> = React.memo(({ id, todosData }) => {
  const [currentTodoData, setCurrentTodoData] = useState<Todo>();
  const [newTodoTitle, setNewTodoTitle] = useState<TodoRequest>({
    title: currentTodoData?.title,
  });
  const [editingStatus, setEditingStatus] = useState<boolean>(false);
  // console.log("Компонент перерисовался");

  const loadTodoItem = useCallback(() => {
    const todo = todosData.find((t) => t.id === id);
  
    if (todo && (todo.title !== currentTodoData?.title || todo.isDone !== currentTodoData?.isDone)) {
      setCurrentTodoData(todo);
      setNewTodoTitle({ title: todo.title });
    }
  
    window.dispatchEvent(new Event("visibilityChange"));
  }, [id, currentTodoData, todosData]);
  
  useEffect!(() => {
    const interval = setInterval(() => {
      loadTodoItem();
    }, 5000);
    return () => clearInterval(interval); // сбросить счётчик
  }, []);

  useEffect(() => {
    loadTodoItem();
  }, [loadTodoItem]);

  const changingTodoTitle = async () => {
    try {
      setEditingStatus(false);
      setNewTodoTitle({ title: newTodoTitle.title?.trim() });
      await changeData(currentTodoData!.id, newTodoTitle);
      // window.dispatchEvent(new Event("todoListUpdated"));
      // window.dispatchEvent(new Event("todoCountUpdated"));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const changingTodoStatus = async () => {
    try {
      await changeData(currentTodoData!.id, {
        isDone: !currentTodoData?.isDone,
      });

      window.dispatchEvent(new Event("todoListUpdated"));
      window.dispatchEvent(new Event("todoCountUpdated"));
      window.dispatchEvent(new Event("todoItemUpdated"));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <>
      {false ? (
        <div></div>
      ) : (
        <div className="todo-item">
          <section className="left-side">
            <img
              src={
                !currentTodoData?.isDone ? "/empty-circle.png" : "/passed.png"
              }
              alt="incomplete"
              style={{
                width: "1rem",
                height: "1rem",
                marginRight: "0.6rem",
              }}
              onClick={() => {
                changingTodoStatus();
                // window.dispatchEvent(new Event("todoListUpdated"));
                // window.dispatchEvent(new Event("todoListUpdated"));
                // window.dispatchEvent(new Event("todoCountUpdated"));
              }}
              // onMouseDown={changingTodoStatus}
            />
            {editingStatus ? (
              <>
                <Form id={`change${id}`}>
                  <Form.Item
                    initialValue={newTodoTitle?.title}
                    name="title"
                    rules={[
                      { required: true, message: "Введите текст задачи" },
                      {
                        min: 2,
                        message:
                          "Текст задачи должен содержать минимум 2 символа",
                      },
                    ]}
                    style={{ marginBottom: "0", width: "12rem" }}
                  >
                    <textarea
                      rows={5}
                      maxLength={64}
                      required
                      onChange={(event) =>
                        setNewTodoTitle({ title: event?.target.value })
                      }
                      value={newTodoTitle?.title}
                      style={{
                        resize: "none",
                        margin: "16px 0px",
                      }}
                    />
                  </Form.Item>
                </Form>
              </>
            ) : (
              <p
                className="todo-item-p"
                style={
                  currentTodoData?.isDone
                    ? { textDecoration: "line-through", color: "dimgray" }
                    : undefined
                }
              >
                {currentTodoData?.title}
              </p>
            )}
          </section>
          <section className="right-side">
            {editingStatus ? (
              <>
                {/* //* кнопка отменить изменения */}
                <Button
                  className="cancel-Button"
                  onClick={() => setEditingStatus(false)}
                >
                  {/* <img src="/cancel.png" alt="cancel" /> */}
                  <CloseOutlined />
                </Button>
                {/* кнопка принять изменения */}
                <Button
                  form={`change${id}`}
                  className="accept-Button"
                  style={{ marginLeft: "0.3rem" }}
                  onClick={() =>
                    newTodoTitle!.title!.trim().length >= 2
                      ? (changingTodoTitle(), setEditingStatus(false))
                      : // window.dispatchEvent(new Event("todoListUpdated")))
                        alert("Текст должен быть от 2 до 64 символов")
                  }
                >
                  {/* <img src="/accept.png" alt="accept" /> */}
                  <CheckOutlined />
                </Button>
              </>
            ) : (
              <>
                {/* //$ кнопка редактировать */}

                <Button
                  className="edit-Button"
                  onClick={() => {
                    setEditingStatus(true);
                    setNewTodoTitle({ title: currentTodoData!.title.trim() });
                  }}
                >
                  {/* <img src="/edit.png" alt="edit" /> */}
                  <FormOutlined />
                </Button>
              </>
            )}
            {/* //@ кнопка удалить todo */}
            <Button
              style={{ marginLeft: "0.3rem" }}
              onClick={() => deleteData(id)}
              className={
                !editingStatus ? "delete-Button" : "delete-Button unactive"
              }
            >
              {/* <img src="/delete.png" alt="delete" /> */}
              <DeleteOutlined />
            </Button>
          </section>
        </div>
      )}
    </>
  );
});

export default TodoItem;
