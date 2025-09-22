import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../libs";
import { PageContainer } from "../components";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    login(username.trim());
    navigate("/");
  };

  return (
    <PageContainer header={<div>Welcome to Notefy</div>}>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Enter a username</Form.Label>
          <Form.Control
            placeholder="e.g. medha"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password (demo)</Form.Label>
          <Form.Control
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </Form.Group>
        <Button className="mt-3" type="submit" disabled={!username.trim() || !password.trim()} block>
          Continue
        </Button>
      </Form>
    </PageContainer>
  );
};

export default Login;


