import PropTypes from "prop-types";
import { Todo } from "../@type/Todo.type";
// @ts-ignore
import styles from "./TaskList.module.scss";


interface Task {
  doneTaskList?: boolean;
  todos: Todo[];
  deleteTodo: (id: string) => void;
  startEditTodo: (id: string) => void;
  handleTodo: (id: string, done: boolean) => void;
}

export const TaskList = (props: Task) => {
  const { doneTaskList, todos, handleTodo, startEditTodo, deleteTodo } = props;
  const handleCheck =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      handleTodo(id, e.target.checked);
    };
  return (
    <div>
      <h2 className={styles.title}>
        {doneTaskList ? "Hoàn Thành" : "Chưa hoàn thành"}
      </h2>

      {todos.map((todo) => {
        return (
          <div className={styles.tasks} key={todo.id}>
            <div className={styles.task}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={handleCheck(todo.id)}
              />
              <span className={styles.taskName}>{todo.name}</span>
            </div>
            <div className={styles.taskActions}>
              <button
                className={styles.taskbtn}
                onClick={() => startEditTodo(todo.id)}
              >
                ⁜
              </button>
              <button
                className={styles.taskbtn}
                onClick={() => deleteTodo(todo.id)}
              >
                µ
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ),
  deleteTodo: PropTypes.func.isRequired,
  startEditTodo: PropTypes.func.isRequired,
  handleTodo: PropTypes.func.isRequired,
};
