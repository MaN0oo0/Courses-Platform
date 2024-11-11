import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Masterlayout from "./Components/Masterlayout/Masterlayout";
import Login from "./Components/Login/Login";
import Courses from "./Components/Courses/Courses";
import PrivateRoute from "./Helpers/ProtectRoutes";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import Home from "./Components/Home/Home";
import AuthServicesProvider from "./Context/AuthServices";
import CourseContextProvider from "./Context/CourseServices";
import CategeoryContextProvider from "./Context/CategeoryServices";
import Categeorie from "./Components/Categeorie/Categeorie";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthServicesProvider>
          <Routes>
            <Route path="/" element={<Masterlayout />}>
              <Route
                index={true}
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="courses"
                element={
                  <PrivateRoute>
                    <Courses />
                  </PrivateRoute>
                }
              />

              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <CourseContextProvider>
                      <CategeoryContextProvider>
                        <Dashboard />
                      </CategeoryContextProvider>
                    </CourseContextProvider>
                  </PrivateRoute>
                }
              />
              <Route
                path="categeorie"
                element={
                  <PrivateRoute>
                    <CourseContextProvider>
                      <CategeoryContextProvider>
                        <Categeorie />
                      </CategeoryContextProvider>
                    </CourseContextProvider>
                  </PrivateRoute>
                }
              />

              {/* Add other routes here */}
              {/* <Route path="*" element={<NotFound />} /> */}
              {/* Catch-all route */}
            </Route>
          </Routes>
        </AuthServicesProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
