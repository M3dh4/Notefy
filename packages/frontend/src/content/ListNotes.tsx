import React, { useState, useTransition, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Alert, Row, Col, Button } from "react-bootstrap";
import { Loading, PageContainer } from "../components";
import { listNotes, type LocalNote } from "../libs";

const ListNotes = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState("");
  const [notes, setNotes] = useState<LocalNote[]>([]);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await listNotes();
        setNotes(data);
      } catch (error) {
        setErrorMsg(`${error.toString()}`);
      }
    });
  }, []);

  const renderNotes = (notes: LocalNote[]) =>
    notes.map((note) => (
      <Link key={note.noteId} to={`/notes/${note.noteId}`}>
        <Card>
          <Card.Body>
             <Card.Title>
              {note.content.length > 100 ? note.content.slice(0, 100) + "…" : note.content}
             </Card.Title>
            <Card.Subtitle className="text-muted">
              Created: {new Date(parseInt(note.createdAt)).toLocaleString()}
            </Card.Subtitle>
             {note.attachments && note.attachments.length > 0 && (
               <div className="mt-2 small text-muted">{note.attachments.length} attachment(s)</div>
             )}
          </Card.Body>
        </Card>
      </Link>
    ));

  const createNewNote = () => (
    <Link key="new" to="note/new">
      <Button variant="primary" block>
        Create a new note
      </Button>
    </Link>
  );

  return (
    <PageContainer header={<div>Notefy • Your Notes</div>}>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {isPending ? (
        <Loading />
      ) : (
        <div>
          <Row xs={1} md={2} lg={3} className="g-3">
            {notes.length ? (
              renderNotes(notes).map((card, idx) => (
                <Col key={idx} className="mb-3">
                  {card}
                </Col>
              ))
            ) : (
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>No notes yet</Card.Title>
                    <Card.Text>Create your first note to get started.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
          {createNewNote()}
        </div>
      )}
    </PageContainer>
  );
};

export default ListNotes;
