import React, { Suspense, useEffect, useState } from "react";
import api from "../../Helpers/HandleAuthentication";
import Loading from "../Assets/Loading/Loading";
import CourseModal from "./CourseModal";
import MasterCoursesLayout from "../Assets/MasterCoursesLayout/MasterCoursesLayout";

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
          <MasterCoursesLayout>
            {courses.map((course, index) => (
              <CourseModal
                course={course}
                categeory={course.categeory}
                key={index}
                DeleteCourse={handleDeleteCourse}
              />
            ))}
          </MasterCoursesLayout>
        </Suspense>
      </ul>
    </div>
  );
};

export default Courses;
