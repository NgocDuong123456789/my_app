import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

import { TaskInput } from "../TaskInput/TaskInput";
import { TaskList } from "../TaskList/TaskList";
import { Todo } from "../@type/Todo.type";


interface handleNewTodos{
  (todos: Todo[]):Todo[]
}
const syncReactToLocal=(handleNewTodos:handleNewTodos)=>{
  const todoString=localStorage.getItem('todos')
    const TodoObj:Todo[]= JSON.parse(todoString|| '[]')
    const newTodoObj= handleNewTodos(TodoObj)
    localStorage.setItem('todos',JSON.stringify(newTodoObj))

}
export const TodoList = () => {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [todos, setTodo] = useState<Todo[]>([]);
  const doneTodo = todos.filter((todo) => todo.done);
  const notdoneTodo = todos.filter((todo) => !todo.done);
  useEffect(()=>{
   const todoString= localStorage.getItem('todos')
   const todoObj:Todo[]= JSON.parse(todoString || '[]')
   setTodo(todoObj)
  },[])
  const addTodo = (name: string) => {
    const handler=(TodoObj:Todo[])=>{
      return [...TodoObj,todo]
    }
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString(),
    };
    setTodo((prev) => [...prev, todo]);
    // const todoString=localStorage.getItem('todos')
    // const TodoObj:Todo[]= JSON.parse(todoString|| '[]')
    // const newTodoObj= handler(TodoObj)
    // localStorage.setItem('todos',JSON.stringify(newTodoObj))
    syncReactToLocal(handler)
  }
  const handleTodo = (id: string, done: boolean) => {
    setTodo((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  };

  const startEditTodo = (id: string) => {
    const findTodo = todos.find((todo) => todo.id === id);
    if (findTodo) {
      setCurrentTodo(findTodo);
    }
  };
  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name };
      else return null;
    });
  };
  const finishEditTodo = () => {
    const handler=(prev:Todo[]) => {
      return prev.map((todo) => {
        if (todo.id === currentTodo?.id) {
          return currentTodo as Todo;
        } else {
          return todo as Todo;
        }
      });
    }
    setTodo(handler);
    setCurrentTodo(null);

    // const todoString=localStorage.getItem('todos')
    // const TodoObj:Todo[]= JSON.parse(todoString|| '[]')
    // const newTodoObj=handler(TodoObj)
    // localStorage.setItem('todos',JSON.stringify(newTodoObj))
    syncReactToLocal(handler)
  };

  const deleteTodo=(id:string)=>{
    const handler=(prev:Todo[])=>{
      return prev.filter(todo=>todo.id!==id)
    }
    setTodo(handler)
    // const todoString=localStorage.getItem('todos')
    // const TodoObj:Todo[]= JSON.parse(todoString|| '[]')
    //  const newTodoObj= handler(TodoObj)
    // localStorage.setItem('todos',JSON.stringify(newTodoObj))
    syncReactToLocal(handler)

  }
  // cách 2 dùng để xóa
  // const deleteTodo = (id:string)=>{
  //   if(currentTodo){
  //     setCurrentTodo(null)
  //   }
  //   setTodo((prev)=>{
  //     const findIndexTodo=prev.findIndex(todo=>todo.id===id)
  //     if(findIndexTodo> -1){
  //       const result=[...prev]
  //       result.splice(findIndexTodo,1)
  //       return result
  //     }
  //     return prev
  //   })
   
  // }
  return (
    <>
      <TaskInput
        addTodo={addTodo}
        
        currentTodo={currentTodo}
        editTodo={editTodo}
        finishEditTodo={finishEditTodo}
      />
      <TaskList
        todos={notdoneTodo}
        handleTodo={handleTodo}
        startEditTodo={startEditTodo}
        deleteTodo={deleteTodo}
      />
      <TaskList
        doneTaskList
        todos={doneTodo}
        handleTodo={handleTodo}
        startEditTodo={startEditTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
};
