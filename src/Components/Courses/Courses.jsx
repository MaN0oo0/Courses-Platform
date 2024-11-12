import React, { Suspense, useEffect, useState } from "react";
import api from "../../Helpers/HandleAuthentication";
import Loading from "../Assets/Loading/Loading";
import CourseModal from "./CourseModal";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/Courses");
        setCourses(response.data.courses.$values);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);
  const handleDeleteCourse = async (courseId) => {
    await api.delete(`/courses/${courseId}`);
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        <Suspense fallback={<Loading />}>
          <div className="row col-md-12 my-3 bg-secondary mb-2 d-flex justify-content-center gap-2 overflow-y-auto">
            {courses.map((course, index) => (
              <CourseModal
                course={course}
                key={index}
                DeleteCourse={handleDeleteCourse}
              />
            ))}
          </div>
        </Suspense>
      </ul>
    </div>
  );
};

export default Courses;
