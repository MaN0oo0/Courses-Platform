import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Masterlayout(props) {
  return (
    <>
      <Navbar
        IsLogin={props.IsLogin}
        logOut={props.logOut}
        userdata={props.userdata}
      />
      <div className={`container-md my-3 bg-dark`}>
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
