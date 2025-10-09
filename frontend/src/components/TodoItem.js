import React from "react";

export default function TodoItem({ task, onDelete }) {
  return (
    <li style={{ margin: "10px" }}>
      <span>{task.title} - {task.status}</span>
      <button onClick={() => onDelete(task.id)} style={{ marginLeft: "10px" }}>Delete</button>
    </li>
  );
}
