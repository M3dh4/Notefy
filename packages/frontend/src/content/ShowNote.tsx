import React, { useState, useEffect, useTransition } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { DeleteNoteButton, SaveNoteButton } from "./";
import { getNote, updateNote, type LocalAttachment } from "../libs";
import { HomeButton, Loading, PageContainer } from "../components";

const ShowNote = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [noteContent, setNoteContent] = useState("");
  const [attachments, setAttachments] = useState<LocalAttachment[]>([]);

  useEffect(() => {
    if (noteId) {
      startTransition(async () => {
        try {
          const data = await getNote(noteId);
          if (!data) {
            navigate("/404");
            return;
          }
          setNoteContent(data.content);
          setAttachments(data.attachments || []);
        } catch (error) {
          // Navigate to 404 page, as noteId probably not present
          navigate("/404");
        }
      });
    }
  }, [noteId]);

  return (
    <PageContainer header={<HomeButton />}>
      {isPending ? (
        <Loading />
      ) : (
        <form>
          <Form.Group controlId="content">
            <Form.Label>Note Content</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={noteContent}
              onChange={(e) => {
                const content = e.currentTarget.value;
                if (content) {
                  setNoteContent(content);
                }
              }}
            />
          </Form.Group>
          {attachments.length > 0 && (
            <Form.Group>
              <Form.Label>Attachments</Form.Label>
              <div>
                {attachments.map((a) => (
                  <div key={a.id} className="mb-2">
                    {a.type.startsWith("image/") ? (
                      <img src={a.dataUrl} alt={a.name} style={{ maxWidth: "100%", borderRadius: 8 }} />
                    ) : (
                      <a href={a.dataUrl} download={a.name}>{a.name}</a>
                    )}
                  </div>
                ))}
              </div>
            </Form.Group>
          )}
          <div className="d-flex flex-column">
            <SaveNoteButton noteId={noteId || ""} noteContent={noteContent} />
            <DeleteNoteButton noteId={noteId || ""} />
          </div>
        </form>
      )}
    </PageContainer>
  );
};

export default ShowNote;
