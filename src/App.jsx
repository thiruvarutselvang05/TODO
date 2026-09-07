import { useState } from "react";

const initialTasks = [
  { id: 1, text: "Sketch the wireframes", done: true },
  { id: 2, text: "Reply to Priya about the demo", done: false },
  { id: 3, text: "Pick up the dry cleaning", done: false },
];

export default function TodoList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setDraft("");
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const removeTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearDone = () => setTasks((prev) => prev.filter((t) => !t.done));

  const visible = tasks.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.done : !t.done
  );

  const remaining = tasks.filter((t) => !t.done).length;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F4F1E8",
        display: "flex",
        justifyContent: "center",
        padding: "48px 20px",
        fontFamily:
          "'Iowan Old Style', 'Palatino Linotype', Georgia, serif",
        color: "#2B2A26",
      }}
    >
      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.02em",
              color: "#8A8370",
              fontFamily: "system-ui, sans-serif",
              marginBottom: 6,
            }}
          >
            {today}
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 38,
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#20302C",
            }}
          >
            Today's list
          </h1>
        </div>

        {/* Add task */}
        <form
          onSubmit={addTask}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 30,
            borderBottom: "2px solid #20302C",
            paddingBottom: 12,
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write something down…"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: 17,
              fontFamily: "inherit",
              color: "#2B2A26",
            }}
          />
          <button
            type="submit"
            style={{
              border: "1px solid #20302C",
              background: "#20302C",
              color: "#F4F1E8",
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: 18,
            marginBottom: 22,
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
          }}
        >
          {[
            { key: "all", label: "All" },
            { key: "open", label: "Open" },
            { key: "done", label: "Done" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
                color: filter === f.key ? "#20302C" : "#A8A296",
                borderBottom:
                  filter === f.key
                    ? "2px solid #3D6B63"
                    : "2px solid transparent",
                paddingBottom: 4,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div>
          {visible.length === 0 && (
            <div
              style={{
                color: "#A8A296",
                fontStyle: "italic",
                padding: "20px 0",
                fontFamily: "system-ui, sans-serif",
                fontSize: 14,
              }}
            >
              {filter === "done"
                ? "Nothing finished yet."
                : "Nothing here. Add the first thing."}
            </div>
          )}
          {visible.map((task, i) => (
            <div
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 0",
                borderBottom: "1px solid #DCD6C4",
              }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                aria-label={task.done ? "Mark as open" : "Mark as done"}
                style={{
                  width: 20,
                  height: 20,
                  minWidth: 20,
                  borderRadius: "50%",
                  border: `2px solid ${task.done ? "#3D6B63" : "#8A8370"}`,
                  background: task.done ? "#3D6B63" : "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: 17,
                  color: task.done ? "#A8A296" : "#2B2A26",
                  textDecoration: task.done ? "line-through" : "none",
                  textDecorationColor: "#B8B29C",
                }}
              >
                {task.text}
              </span>
              <button
                onClick={() => removeTask(task.id)}
                aria-label="Delete task"
                style={{
                  border: "none",
                  background: "none",
                  color: "#C2BBA6",
                  fontSize: 18,
                  cursor: "pointer",
                  fontFamily: "system-ui, sans-serif",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 26,
            fontFamily: "system-ui, sans-serif",
            fontSize: 13,
            color: "#8A8370",
          }}
        >
          <span>
            {remaining} {remaining === 1 ? "task" : "tasks"} left
          </span>
          {tasks.some((t) => t.done) && (
            <button
              onClick={clearDone}
              style={{
                border: "none",
                background: "none",
                color: "#8A8370",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 13,
                padding: 0,
              }}
            >
              Clear finished
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
