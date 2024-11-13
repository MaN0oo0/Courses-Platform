import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../Assets/DeleteModal";
import { AuthContext } from "../../Context/AuthServices";

export default function CourseModal(props) {
  let { title, instructor, imageUrl, description, id,categeoryName } = props.course;


  let { role } = useContext(AuthContext);

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          style={{ width: "260px", height: "150px" }}
          src={
            imageUrl
              ? `https://res.cloudinary.com/dckqgbato/image/upload/${imageUrl}`
              : ""
          }
          alt={`${title}`}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{title}</h5>

            <span class="badge text-bg-secondary">{categeoryName?categeoryName:'Othera'}</span>
          </div>
          <span className="text-muted">
            <b>instructor</b> : {instructor}
          </span>
          <p className="card-text">{description}</p>
          <div className="HelpersBtns">
            {role && role.includes("Admin") ? (
              <>
                <Link className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </Link>
                <Link className="btn btn-warning">
                  <i className="fa fa-pen"></i>
                </Link>
                <DeleteModal DeleteCat={props.DeleteCourse} catId={id} />
              </>
            ) : (
              <button className="btn btn-primary">
                {" "}
                <i className="fa fa-pen"></i>
              </button>
            )}

            {/* <button className="btn btn-danger" onClick={() => DeleteCourse(id)}>
              Delete
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
