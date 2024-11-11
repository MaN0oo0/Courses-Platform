import { React, useEffect, useRef, useState } from "react";

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  //   const [data, setData] = useState("");
  function handleClick(res) {
    props.sendDataToParent(res);
  }
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dckqgbato",
        uploadPreset: "yp9oubzl",
      },
      (error, res) => {
        if (!error && res.event === "success") {
          console.log(res.info);

          handleClick(res.info);
        }

        // console.log(res);
      }
    );
  }, []);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          widgetRef.current.open();
        }}
      >
        Upload
      </button>
    </>
  );
};
export default UploadWidget;
