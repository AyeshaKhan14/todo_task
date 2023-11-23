import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const TodoList = ({
  filteredTodos,
  editTask,
  deleteTask,
  toggleComplete,
}) => {
  return (
    <div className='md:w-[50%] m-auto'>
      <table className='border bg-zinc-100 w-full'>
        <thead>
          <tr className='bg-black text-white'>
            <th colSpan='4' className='text-center text-lg'>
              Task List
            </th>
          </tr>
        </thead>

        <thead className='text-center'>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='border p-4'>
          {filteredTodos.map((todo) => (
            <tr className='border border-gray-300 p-4' key={todo.id}>
              <td className='text-center p-2'>{todo.id}</td>
              <td className='text-center'>{todo.title}</td>
              <td
                className={`text-center cursor-pointer ${
                  todo.completed ? "bg-green-200" : "bg-red-200"
                }`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </td>
              <td className='flex p-2 gap-2 justify-center items-center'>
                <button
                  onClick={() =>
                    editTask(
                      todo.id,
                      prompt("Enter new task name:", todo.title)
                    )
                  }
                >
                  <FaRegEdit className='text-xl text-green-600' />
                </button>
                <button onClick={() => deleteTask(todo.id)}>
                  <MdDelete className='text-xl text-red-600' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
