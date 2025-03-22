import React, { useCallback, useEffect, useState } from "react";
import { changeData, deleteData } from "../../../api/todosApi";
import { Todo, TodoRequest, TodoItemProps } from "../../../types/todos";
import "./TodoItem.css";
import { Button, Form, Input } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";

const TodoItem: React.FC<TodoItemProps> = React.memo(
  ({ id, todosData, loadTodoList }) => {
    const [currentTodoData, setCurrentTodoData] = useState<Todo>();
    const [newTodoTitle, setNewTodoTitle] = useState<TodoRequest>({
      title: currentTodoData?.title,
    });
    const [editingStatus, setEditingStatus] = useState<boolean>(false);

    const minTaskLength = 2;
    const maxTaskLength = 64;

    const loadTodoItem = useCallback(() => {
      const todo = todosData.find((t) => t.id === id);

      if (
        todo &&
        (todo.title !== currentTodoData?.title ||
          todo.isDone !== currentTodoData?.isDone)
      ) {
        setCurrentTodoData(todo);
        setNewTodoTitle({ title: todo.title });
      }
    }, [id, currentTodoData, todosData]);

    const changingTodoTitle = async () => {
      try {
        setEditingStatus(false);
        setNewTodoTitle({ title: newTodoTitle.title?.trim() });
        await changeData(currentTodoData!.id, newTodoTitle);
        loadTodoList();
        loadTodoItem();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      } finally {
      }
    };

    const handleChangeStatus = async () => {
      try {
        await changeData(currentTodoData!.id, {
          isDone: !currentTodoData?.isDone,
        });
        loadTodoList();
        loadTodoItem();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    };

    const handleEditClick = () => {
      setEditingStatus(true);
      setNewTodoTitle({ title: currentTodoData!.title.trim() });
    };

    const handleAcceptClick = () => {
      if (
        newTodoTitle!.title!.trim().length >= 2 &&
        newTodoTitle!.title!.trim().length <= 64
      ) {
        changingTodoTitle();
        setEditingStatus(false);
      } else {
        alert("Текст должен быть от 2 до 64 символов");
      }
    };

    const handleDeleteClick = async (id: number) => {
      try {
        await deleteData(id);
        loadTodoList();
        loadTodoItem();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    };

    useEffect!(() => {
      const interval = setInterval(() => {
        loadTodoItem();
      }, 5000);
      return () => clearInterval(interval); // сбросить счётчик
    }, []);

    useEffect(() => {
      loadTodoItem();
    }, [loadTodoItem]);

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
                  handleChangeStatus();
                }}
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
                          min: minTaskLength,
                          message:
                            "Текст задачи должен содержать минимум 2 символа",
                        },
                        {
                          max: maxTaskLength,
                          message:
                            "Текст задачи должен содержать максимум 64 символа",
                        },
                      ]}
                      style={{ marginBottom: "0", width: "12rem" }}
                    >
                      <Input.TextArea
                        rows={5}
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
                    <CloseOutlined />
                  </Button>
                  {/* кнопка принять изменения */}
                  <Button
                    form={`change${id}`}
                    className="accept-Button"
                    style={{ marginLeft: "0.3rem" }}
                    onClick={handleAcceptClick}
                  >
                    <CheckOutlined />
                  </Button>
                </>
              ) : (
                <>
                  {/* //$ кнопка редактировать */}

                  <Button className="edit-Button" onClick={handleEditClick}>
                    <FormOutlined />
                  </Button>
                </>
              )}
              {/* //@ кнопка удалить todo */}
              <Button
                style={{ marginLeft: "0.3rem" }}
                onClick={() => {
                  handleDeleteClick(id);
                }}
                className={
                  !editingStatus ? "delete-Button" : "delete-Button unactive"
                }
              >
                <DeleteOutlined />
              </Button>
            </section>
          </div>
        )}
      </>
    );
  }
);

export default TodoItem;
