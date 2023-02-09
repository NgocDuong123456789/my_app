import PropTypes from "prop-types";
import { useState, useMemo, useCallback } from "react";
import { Todo } from "../@type/Todo.type";
import Title from "../Title/Title";
// @ts-ignore
import style from "./TaskInput.module.scss";
interface TaskInputProps {
  addTodo: (name: string) => void;
  currentTodo: Todo | null;
  editTodo: (name: string) => void;
  finishEditTodo: () => void;
}

export const TaskInput = (props: TaskInputProps) => {
  const [name, setName] = useState<string>("");

  const address = useMemo(() => {
    return { street: "10 tran" };
  }, []);
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTodo) {
      finishEditTodo();
      setName("");
    } else {
      addTodo(name);
      setName("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(e.target.value);
    }
    setName(e.target.value);
  };
  const handleClickTitle = useCallback((value: any) => {
    console.log(value);
  }, []);
  return (
    <div>
      <Title address={address} handleClickTitle={handleClickTitle} />
      <h1 className={style.title}>To do list typescript</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="caption goes here"
          value={currentTodo ? currentTodo.name : name}
          onChange={handleChange}
        />
        <button type="submit">{currentTodo ? "✔" : "+"}</button>
      </form>
    </div>
  );
};

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
    PropTypes.oneOf([null]),
  ]),
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
};
