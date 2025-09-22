import React from "react";
import { Card } from "react-bootstrap";

const PageContainer = (props: { header: React.ReactNode; children: React.ReactNode }) => (
  <Card className="shadow-sm">
    <Card.Header className="bg-white">
      <div className="d-flex align-items-center">
        <div className="badge badge-primary mr-2">●</div>
        <div className="font-weight-bold">{props.header}</div>
      </div>
    </Card.Header>
    <Card.Body>{props.children}</Card.Body>
  </Card>
);

export { PageContainer };
