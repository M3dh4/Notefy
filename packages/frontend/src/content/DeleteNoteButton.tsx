import React, { useState, useTransition } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonSpinner } from "../components";
import { deleteNote } from "../libs";

const DeleteNoteButton = (props: { noteId: string }) => {
  const { noteId } = props;
  const [isDeleting, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        await deleteNote(noteId);
        navigate("/");
      } catch (error) {
        setErrorMsg(`${error.toString()} - deleteNote - ${noteId}`);
      }
    });
  };

  return (
    <>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Button variant="danger" disabled={isDeleting} onClick={handleDelete} block>
        {isDeleting ? <ButtonSpinner /> : ""}
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
};

export { DeleteNoteButton };
