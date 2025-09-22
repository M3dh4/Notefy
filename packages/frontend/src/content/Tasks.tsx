import React, { useEffect, useState, useTransition } from "react";
import { Form, Button, ListGroup, Badge } from "react-bootstrap";
import { listTasks, createTask, toggleTask, deleteTask, type TaskItem } from "../libs";
import { PageContainer } from "../components";

const Tasks = () => {
  const [isPending, startTransition] = useTransition();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState("");

  useEffect(() => {
    startTransition(async () => {
      const data = await listTasks();
      setTasks(data);
    });
  }, []);

  const onAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    startTransition(async () => {
      await createTask(title.trim(), dueAt ? new Date(dueAt).getTime().toString() : undefined);
      setTitle("");
      setDueAt("");
      setTasks(await listTasks());
    });
  };

  const onToggle = async (taskId: string) => {
    await toggleTask(taskId);
    setTasks(await listTasks());
  };

  const onDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(await listTasks());
  };

  const formatDue = (t?: string) => (t ? new Date(parseInt(t)).toLocaleString() : "No due date");

  return (
    <PageContainer header={<div>Tasks</div>}>
      <Form onSubmit={onAdd} className="mb-3">
        <Form.Row>
          <div className="col-sm-6 mb-2">
            <Form.Control placeholder="Task title" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          </div>
          <div className="col-sm-4 mb-2">
            <Form.Control type="datetime-local" value={dueAt} onChange={(e) => setDueAt(e.currentTarget.value)} />
          </div>
          <div className="col-sm-2 mb-2">
            <Button type="submit" block disabled={!title.trim() || isPending}>Add</Button>
          </div>
        </Form.Row>
      </Form>
      <ListGroup>
        {tasks.map((t) => (
          <ListGroup.Item key={t.taskId} className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#111520", color: "#e6e6e6" }}>
            <div className="d-flex align-items-center">
              <Form.Check type="checkbox" className="mr-2" checked={!!t.completedAt} onChange={() => onToggle(t.taskId)} />
              <div>
                <div className="font-weight-bold" style={{ textDecoration: t.completedAt ? "line-through" : "none" }}>{t.title}</div>
                <div className="small text-muted">Due: {formatDue(t.dueAt)}</div>
              </div>
            </div>
            <div>
              {t.completedAt && <Badge variant="success" className="mr-2">Done</Badge>}
              <Button size="sm" variant="outline-danger" onClick={() => onDelete(t.taskId)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
        {tasks.length === 0 && (
          <ListGroup.Item style={{ backgroundColor: "#111520", color: "#e6e6e6" }}>No tasks yet. Add one above.</ListGroup.Item>
        )}
      </ListGroup>
    </PageContainer>
  );
};

export default Tasks;


