import "./AddTodo.css";
import { postData } from "../../../api/todosApi";
import { useState } from "react";
import { Button, Input, Form } from "antd";
import { TodoRequest, addTodoProps } from "../../../types/todos";

const AddTodo: React.FC<addTodoProps> = ({
  filteredTodoStatus,
  loadTodoList,
}) => {
  const [newTodo, setNewTodo] = useState<TodoRequest>({
    isDone: false,
    title: "",
  });
  const [form] = Form.useForm();

  const minTaskLength = 2;
  const maxTaskLength = 64;

  const addingTodo = async () => {
    if (newTodo.title && newTodo.title?.trim().length >= 2) {
      setNewTodo({
        title: newTodo.title.trim(),
      });
      try {
        await postData(newTodo);
        setNewTodo({
          title: "",
        });
        loadTodoList();
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
      }
    } else alert("Текст должен быть от 2 до 64 символов");
  };

  const handleFinish = () => {
    addingTodo();
    form.resetFields();
  };

  return (
    <Form
      style={{ marginTop: "1rem" }}
      form={form}
      className="add-todo"
      onFinish={handleFinish}
    >
      <Form.Item
        name="title"
        rules={[
          { required: true, message: "Введите текст задачи" },
          {
            min: minTaskLength,
            message: "Текст задачи должен содержать минимум 2 символа",
          },
          {
            max: maxTaskLength,
            message: "Текст задачи должен содержать максимум 64 символа",
          },
        ]}
        style={{ marginBottom: "0", width: "12rem" }}
      >
        <Input
          placeholder="Ваша задача"
          value={newTodo.title}
          onChange={(event) => {
            setNewTodo({
              title: event.target.value,
            });
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{
            paddingInline: "2rem",
            paddingBlock: "1.1rem",
            marginBottom: "0",
          }}
          type="primary"
          htmlType="submit"
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTodo;
