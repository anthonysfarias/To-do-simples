"use client";

import React, { useState } from "react";
import { Task } from "../interface/TodoList";
import { IoMdAdd, IoMdTrash } from "react-icons/io";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const filteredTasks = tasks.filter((task) => !task.completed);
    setTasks(filteredTasks);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white bg-opacity-25 shadow-lg backdrop-blur-md rounded-lg border border-white border-opacity-25">
        <h1 className="text-xl font-semibold mb-4">Tarefas a fazer</h1>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              <span onClick={() => toggleTaskCompletion(task.id)}>
                {task.text}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Adicionar nova tarefa..."
            className="flex-grow border rounded px-2 py-1 mb-2 md:mb-0 md:mr-2"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
          />

          <button
            className="bg-primary text-white px-4 py-1 rounded flex items-center mr-2"
            onClick={addTask}
          >
            <IoMdAdd className="mr-2" /> Adicionar
          </button>
        </div>
        <button
          className="bg-red-500 text-white mt-2 px-4 py-1 rounded flex items-center"
          onClick={clearCompletedTasks}
        >
          <IoMdTrash className="mr-2" /> Limpar
        </button>
      </div>
    </div>
  );
};

export default TaskList;
