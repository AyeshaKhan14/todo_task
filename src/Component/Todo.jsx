import axios from "axios";
import React, { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { toast } from "react-toastify";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  const getData = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/1/todos`)
      .then((res) => {
        //console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      toast.success("Task Added!");
      setNewTask("");
    }
  };

  const editTask = (id, newTitle) => {
    if (newTitle !== null && newTitle !== undefined) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    toast.success("Task Deleted");
  };
  useEffect(() => {
    getData();
  }, []);

  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <>
      <div className='bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0] h-full p-4 flex flex-col gap-4'>
        <div className=' md:w-[50%] m-auto flex justify-center'>
          <input
            type='text'
            placeholder='Add new task'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='border border-gray-300 rounded-l-full p-1 w-[400px] outline-none'
          />
          <button
            className='border p-2 text-white bg-red-500 '
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <div className='w-[50%] m-auto flex justify-end items-center gap-2'>
          <label className='flex gap-2 font-bold'>
            Status Completed
            <input
              type='checkbox'
              className='cursor-pointer'
              checked={filterCompleted}
              onChange={() => setFilterCompleted(!filterCompleted)}
            />
          </label>
        </div>
        <TodoList
          filteredTodos={filteredTodos}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      </div>
    </>
  );
};
