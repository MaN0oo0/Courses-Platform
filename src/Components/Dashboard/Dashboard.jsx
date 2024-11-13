import React, { Suspense, useContext, useEffect, useState } from "react";
import api from "../../Helpers/HandleAuthentication";
import { CourseContext } from "../../Context/CourseServices";
import {  useNavigate } from "react-router-dom";
import "./Dashboard.css";
import FormModal from "../Assets/FormModal";
import Loading from "../Assets/Loading/Loading";
import CourseModal from "../Courses/CourseModal";
import MasterCoursesLayout from "../Assets/MasterCoursesLayout/MasterCoursesLayout";


const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [sortBy, setSortBy] = useState("Title");
  const [searchTerm, setSearchTerm] = useState("");

  // const [notifications, setNotifications] = useState([]);
  let { addCourse, getCourses } = useContext(CourseContext);

  const navigate = useNavigate();
  const fetchCourses = async (page) => {
    try {
      let data = await getCourses(page, pageSize, sortBy, searchTerm);
      setCourses(data.courses.$values);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchCourses(currentPage);
  }, [searchTerm, sortBy, currentPage, pageSize]);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  // const handleAddCourse = async (newCourse) => {
  //   const response = await api.post("/courses", newCourse);
  //   setCourses([...courses, response.data]);
  // };

  const handleDeleteCourse = async (courseId) => {
    await api.delete(`/courses/${courseId}`);
    setCourses(courses.filter((course) => course.id !== courseId));
  };
  const PageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };
  // const handleEnrollmentNotification = (studentName, courseTitle) => {
  //   setNotifications([
  //     ...notifications,
  //     `${studentName} joined ${courseTitle}.`,
  //   ]);
  // };

  return (
    <div>
      <h1>Course Dashboard</h1>
      <div className="searchBar row col-md-12 my-3 gap-1">
        <div className="col-md-3 d-flex justify-content-center gap-2 ">
          <input
            type="text"
            placeholder="Search by "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => fetchCourses(currentPage)}
          >
            Search
          </button>
        </div>

        <div className="col-md-8 d-flex  gap-2  justify-content-evenly align-items-center ">
          <select
            id="sortBy"
            className="form-control-sm h-50"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="Title">Sort By Title</option>
            <option value="Instructor">Sort By Instructor</option>
            <option value="EnrollmentCount">Sort By Enrollment Count</option>
          </select>
          <select
            className="form-control-sm h-50"
            value={pageSize}
            onChange={PageSizeChange}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="25">25</option>
          </select>
          <div className="d-flex justify-content-center gap-2 ">
            <FormModal addCourse={addCourse} />
          </div>
        </div>
      </div>

      <div className="row col-md-12 bg-secondary mb-2 d-flex justify-content-center gap-2">
        <Suspense fallback={<Loading />}>
          <>
            <MasterCoursesLayout>
              {courses &&
                courses.map((course, index) => (
                  <>
                    <CourseModal
                      course={course}
                      key={index}
                      DeleteCourse={handleDeleteCourse}
                    />
                  </>
                ))}
            </MasterCoursesLayout>
          </>
        </Suspense>
      </div>

      <div className="pagnateBtn m-auto w-50 bg-dark p-2 d-flex justify-content-center gap-2 ">
        <button
          className="btn btn-sm btn-success"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm btn-success"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
