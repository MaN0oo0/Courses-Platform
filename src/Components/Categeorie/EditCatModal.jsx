import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { CategeoryContext } from "../../Context/CategeoryServices";

export default function EditCatModal(props) {
  let { editCategory } = useContext(CategeoryContext);
  const [show, setShow] = useState(false);
  const [categorie, setCategorie] = React.useState({
    id: "",
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState(null);
  const [responseError, setResError] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setCategorie(props.categoryData);
  }, [props.categoryData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategorie({ ...categorie, [name]: value });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", categorie.name),
      description: validateField("description", categorie.description),
    };
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        editCategory(categorie.id, categorie, props.UpdateCat);
        // let data = await getCategeoryes();
        // props.UpdateCat(data);
        setErrors({});
        handleClose();
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
  return (
    <>
      <Button onClick={handleShow} variant="warning">
        <i className="fa fa-pen"></i>
      </Button>

      <Modal
        backdrop="static"
        keyboard={false}
        centered={true}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="bg-black">
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black">
          <ul>
            {responseError.error && (
              <li key={responseError.error} className="text-danger">
                {responseError.error}
              </li>
            )}
          </ul>
          <Form>
            {["name", "description"].map((field) => (
              <div className="input_data bg-black text-white" key={field}>
                <label htmlFor={field} className="form-label">
                  {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                </label>
                {field === "description" ? (
                  <>
                    <textarea
                      class="form-control mb-3 bg-black text-white-50"
                      onChange={handleInputChange}
                      rows="5"
                      name={field}
                      value={categorie[field]}
                    />
                  </>
                ) : (
                  <>
                    <input
                      onChange={handleInputChange}
                      type={"text"}
                      className="form-control bg-black text-white-50"
                      name={field}
                      id={field}
                      placeholder={`Enter your ${field
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}`}
                      value={categorie[field]}
                    />
                  </>
                )}

                {errors && <p className="text-danger">{errors[field]}</p>}
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-black border-0">
          <Button variant="secondary " onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
