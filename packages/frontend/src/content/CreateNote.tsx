import React, { useState, FormEvent, useTransition } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createNote, type LocalAttachment } from "../libs";
import { HomeButton, ButtonSpinner, PageContainer } from "../components";

const CreateNote = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [attachments, setAttachments] = useState<LocalAttachment[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        await createNote(noteContent, attachments);
        navigate("/");
      } catch (error) {
        setErrorMsg(`${error.toString()} - createNote - ${noteContent}`);
      }
    });
  };

  const onFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const newAttachments: LocalAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      newAttachments.push({ id: `${Date.now()}-${i}`, name: file.name, type: file.type || "application/octet-stream", dataUrl });
    }
    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  return (
    <PageContainer header={<HomeButton />}>
      <form onSubmit={handleSubmit}>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Form.Group controlId="content">
          <Form.Label>Note Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder={"Enter note content"}
            onChange={(e) => {
              const content = e.currentTarget.value;
              if (content) {
                setNoteContent(content);
              }
            }}
          />
        </Form.Group>
        <Form.Group controlId="attachments">
          <Form.Label>Attachments</Form.Label>
          <Form.Control type="file" multiple accept="image/*,application/pdf,.pdf,.doc,.docx,.txt" onChange={onFilesSelected} />
          {attachments.length > 0 && (
            <div className="mt-2">
              {attachments.map((a) => (
                <div key={a.id} className="small text-muted">{a.name}</div>
              ))}
            </div>
          )}
        </Form.Group>
        <Button type="submit" disabled={!noteContent || isPending} block>
          {isPending ? <ButtonSpinner /> : ""}
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </PageContainer>
  );
};

export default CreateNote;
