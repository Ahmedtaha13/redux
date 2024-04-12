import React, { useState } from 'react';

// Task component
const Task = ({ id, description, isDone, toggleDone, editTask }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => toggleDone(id)}
      />
      <span>{description}</span>
      <button onClick={() => editTask(id)}>Edit</button>
    </div>
  );
};

// ListTask component
const ListTask = ({ tasks, toggleDone, filter, editTask }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'done') {
      return task.isDone;
    } else if (filter === 'not') {
      return !task.isDone;
    }
    return true;
  });

  return (
    <div>
      {filteredTasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          description={task.description}
          isDone={task.isDone}
          toggleDone={toggleDone}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

// AddTask component
const AddTask = ({ addTask }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addTask(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

// App component
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = description => {
    const newTask = {
      id: Date.now(),
      description,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleDone = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const editTask = id => {
    // Implement editing task functionality here
    console.log(`Editing task with ID ${id}`);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <AddTask addTask={addTask} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('done')}>Done</button>
        <button onClick={() => setFilter('not')}>Not Done</button>
      </div>
      <ListTask tasks={tasks} toggleDone={toggleDone} filter={filter} editTask={editTask} />
    </div>
  );
};

export default App;
