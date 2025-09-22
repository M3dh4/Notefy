import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import { NavBar } from "./components";
import { isLoggedIn, seedIfEmpty } from "./libs";

const ListNotes = lazy(() => import("./content/ListNotes"));
const CreateNote = lazy(() => import("./content/CreateNote"));
const ShowNote = lazy(() => import("./content/ShowNote"));
const NotFound = lazy(() => import("./content/NotFound"));
const Login = lazy(() => import("./content/Login"));
const Tasks = lazy(() => import("./content/Tasks"));

const Routes = () => {
  seedIfEmpty();
  return (
    <div className="mt-md-4 d-flex flex-column">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavBar />
          <ReactRoutes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={isLoggedIn() ? <ListNotes /> : <Navigate to="/login" replace />} />
            <Route path="/tasks" element={isLoggedIn() ? <Tasks /> : <Navigate to="/login" replace />} />
            <Route path="/note/new" element={isLoggedIn() ? <CreateNote /> : <Navigate to="/login" replace />} />
            <Route path="/notes/:noteId" element={isLoggedIn() ? <ShowNote /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </ReactRoutes>
        </Router>
      </Suspense>
    </div>
  );
};

export { Routes };
