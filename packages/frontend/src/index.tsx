import React from "react";
import { createRoot } from "react-dom/client";
import { Routes } from "./Routes";
import { getCurrentUser } from "./libs";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <div className="container-fluid" style={{ minHeight: "100vh", padding: 24 }}>
    <Routes />
  </div>
);
