import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UploadWidget from "../Upload/Upload";
import { CategeoryContext } from "../../Context/CategeoryServices";

export default function FormModal({ addCourse }) {
  let { getCategeoryes } = useContext(CategeoryContext);
  const [categories, setCategories] = React.useState([]);

  const [show, setShow] = useState(false);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    categeoryId: "",
    playListUrl: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState(null);
  const [responseError, setResError] = useState("");

  useEffect(() => {
    const featchData = async () => {
      let data = await getCategeoryes();
      setCategories(data.$values);
    };
    featchData();
  }, [getCategeoryes]);

  const handleDataFromChild = (data) => {
    let myCou = { ...course };
    myCou["imageUrl"] = data.path;
    setCourse(myCou);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(course);

    const newErrors = {
      title: validateField("title", course.title),
      description: validateField("description", course.description),
      instructor: validateField("instructor", course.instructor),
      categeoryId: validateField("categeoryId", course.categeoryId),
      // playListUrl: validateField("playListUrl", course.playListUrl),
      imageUrl: validateField("imageUrl", course.imageUrl),
    };
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        let data = await addCourse(course);
        console.log(data);

        setErrors({});
        setCourse({
          title: "",
          description: "",
          instructor: "",
          categeoryId: "",
          playListUrl: "",
          imageUrl: "",
        });
        setShow(false);
      } catch (error) {
        let { response } = error;
        if (response) {
          setResError({ error: response.data });
          return;
        } else {
          setResError({ error: error.message });
        }
      }
    } else {
      setErrors(newErrors);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };
  const validateField = (name, value) => {
    if (!value) {
      return `${name.replace(/([A-Z])/g, " $1")} is required`;
    }

    return "";
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add New Course
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <ul>
            {responseError.error && (
              <li key={responseError.error} className="text-danger">
                {responseError.error}
              </li>
            )}
          </ul>
          <form onSubmit={handleSubmit}>
            {["title", "description", "instructor"].map((field) => (
              <div className="input_data" key={field}>
                <label htmlFor={field} className="form-label">
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                </label>
                <input
                  onChange={handleInputChange}
                  type={"text"}
                  className="form-control"
                  name={field}
                  id={field}
                  placeholder={`Enter your ${field
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase()}`}
                  value={course[field]}
                />
                {errors && <p className="text-danger">{errors[field]}</p>}
              </div>
            ))}
            <div className="input_data">
              <label htmlFor="categeoryId" className="form-label">
                categeory
              </label>
              <select
                className="form-control-sm"
                onChange={handleInputChange}
                name="categeoryId"
              >
                <option value="">Select a categeory</option>
                {categories.map((cat, index) => {
                  return (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="input_data">
              <label htmlFor="imageUrl" className="form-label">
                Image
              </label>
              <UploadWidget sendDataToParent={handleDataFromChild} />
              {errors && <p className="text-danger">{errors["imageUrl"]}</p>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark d-flex justify-content-between">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
