import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthServices";
import { Link } from "react-router-dom";

export default function Login() {
  let { login } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
  });

  const [responseError, setResError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateField("email", user.email),
      password: validateField("password", user.password),
    };
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        login(user);
        setResError({});
        setError({});
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
      setError(newErrors);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    setError((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };
  const validateField = (name, value) => {
    if (!value) {
      return `${name.replace(/([A-Z])/g, " $1")} is required`;
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      return "Email is invalid";
    }
    return "";
  };
  return (
    <>
      <div className="w-75 m-auto py-4">
        <h2>Login Form</h2>
        <ul>
          {responseError.error && (
            <li key={responseError.error} className="text-danger">
              {responseError.error}
            </li>
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <div className="input_data" key={field}>
              <label htmlFor={field} className="form-label">
                {field.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                onChange={handleInputChange}
                type={field === "password" ? "password" : "text"}
                className="form-control"
                name={field}
                id={field}
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .toLowerCase()}`}
                value={user[field]}
              />
              {errors && <p className="text-danger">{errors[field]}</p>}
            </div>
          ))}

          <div className="d-flex justify-content-center">
            <div className="w-100 d-flex justify-content-start">
              <Link to={"/register"} className="text-decoration-none">
                dont have account ? register
              </Link>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <button className="btn btn-info">Login</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
