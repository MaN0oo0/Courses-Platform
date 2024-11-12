import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Masterlayout from "./Components/Masterlayout/Masterlayout";
import Login from "./Components/Login/Login";

import PrivateRoute from "./Helpers/ProtectRoutes";
import Register from "./Components/Register/Register";

import Home from "./Components/Home/Home";
import AuthServicesProvider from "./Context/AuthServices";
import CourseContextProvider from "./Context/CourseServices";
import CategeoryContextProvider from "./Context/CategeoryServices";
import Categeorie from "./Components/Categeorie/Categeorie";
import Loading from "./Components/Assets/Loading/Loading";

function App() {
  //lazy loading for courses==>
  const Courses = React.lazy(() => import("./Components/Courses/Courses"));
  const Dashboard = React.lazy(() =>
    import("./Components/Dashboard/Dashboard")
  );

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
                    <Suspense fallback={<Loading />}>
                      <Courses />
                    </Suspense>
                  </PrivateRoute>
                }
              />

              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <CourseContextProvider>
                      <CategeoryContextProvider>
                        <Suspense fallback={<Loading />}>
                          <Dashboard />
                        </Suspense>
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
