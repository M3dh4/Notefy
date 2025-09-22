import React, { useState, useTransition } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonSpinner } from "../components";
import { updateNote } from "../libs";

const SaveNoteButton = (props: { noteId: string; noteContent: string }) => {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSave = async (event: any) => {
    event.preventDefault();
    startTransition(async () => {
      const { noteId, noteContent } = props;
      try {
        await updateNote(noteId, noteContent);
        navigate("/");
      } catch (error) {
        console.log(error);
        setErrorMsg(`${error.toString()} - updateNote - ${noteContent}`);
      }
    });
  };

  return (
    <>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Button disabled={isPending} onClick={handleSave} block>
        {isPending ? <ButtonSpinner /> : ""}
        {isPending ? "Saving..." : "Save"}
      </Button>
    </>
  );
};

export { SaveNoteButton };
