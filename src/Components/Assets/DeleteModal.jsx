import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function DeleteModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let submitDelete = (res) => {
    props.DeleteCat(res);
    setShow(false);
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        <i className="fa fa-trash-can"></i>
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title className="text-warning">Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          Do you really want to Delete?
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              submitDelete(props.catId);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
