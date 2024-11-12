import { React, useEffect, useRef } from "react";

const UploadWidget = (props) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  //   const [data, setData] = useState("");
  const handleClick = (res) => {
    props.sendDataToParent(res);
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dckqgbato",
        uploadPreset: "yp9oubzl",
      },
      (error, res) => {
        if (!error && res.event === "success") {
          handleClick(res.info);
        }

        // console.log(res);
      }
    );
  }, [handleClick]);

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
