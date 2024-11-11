import { createContext, useState } from "react";
import api from "../Helpers/HandleAuthentication";

export let CourseContext = createContext({});

export default function CourseContextProvider(props) {


  const addCourse = async (courseData) => {
    try {
      const response = await api.post("/courses", courseData);
      console.log("Course added:", response.data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  const getCourses = async (
    page = 1,
    pageSize = 10,
    sortBy = "Title",
    searchTerm = ""
  ) => {
    try {
      let { data } = await api.get(
        `/courses?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${searchTerm}`
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CourseContext.Provider value={{ addCourse, getCourses }}>
      {props.children}
    </CourseContext.Provider>
  );
}
