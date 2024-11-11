import React, { useContext, useEffect, useState } from "react";
import api from "../../Helpers/HandleAuthentication";
import { CourseContext } from "../../Context/CourseServices";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import FormModal from "../Assets/FormModal";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("Title");
  const [searchTerm, setSearchTerm] = useState("");

  const [notifications, setNotifications] = useState([]);
  let { addCourse, getCourses } = useContext(CourseContext);
  const navigate = useNavigate();
  const fetchCourses = async (page) => {
    try {
      let data = await getCourses(page, 5, sortBy, searchTerm);
      setCourses(data.courses);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage, sortBy, searchTerm]);
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
        <div className="col-md-4 d-flex justify-content-center gap-2 ">
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

        <div className="col-md-4 d-flex   justify-content-center flex-column">
          <select
            id="sortBy"
            className="form-control"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="Title">Sort By Title</option>
            <option value="Instructor">Sort By Instructor</option>
            <option value="EnrollmentCount">Sort By Enrollment Count</option>
          </select>
        </div>
        <div className="col-md-3 d-flex justify-content-center gap-2 ">
          <FormModal addCourse={addCourse} />
        </div>
      </div>

      <div className="row col-md-12 bg-secondary mb-2 d-flex justify-content-center gap-2">
        {courses.map((course,index) => (
          <>
            <div key={index} className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={`https://res.cloudinary.com/dckqgbato/image/upload/${
                  course.imageUrl && course.imageUrl
                }`}
                alt={`${course.title}`}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {course.title} - {course.instructor}
                </h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <div className="HelpersBtns">
                  <Link href="#" class="btn btn-primary">
                    <i className="fa fa-eye"></i>
                  </Link>
                  <Link href="#" class="btn btn-warning">
                    <i className="fa fa-pen"></i>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
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
