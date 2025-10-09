import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (e) {
      if (e.response?.status === 401) navigate("/");
    }
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/tasks", { title, status: "pending" });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/logout");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>My Todo Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <br/><br/>
      <input placeholder="Enter new task" value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul style={{ listStyle: "none" }}>
        {tasks.map(t => (
          <TodoItem key={t.id} task={t} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
}
