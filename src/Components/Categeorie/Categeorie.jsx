import React, { useContext, useEffect } from "react";
import { CategeoryContext } from "../../Context/CategeoryServices";
import { Link } from "react-router-dom";
import DeleteModal from "../Assets/DeleteModal";
import EditCatModal from "./EditCatModal";

export default function Categeorie() {
  const [categories, setCategories] = React.useState([]);
  let { getCategeoryes, deleteCategory } = useContext(CategeoryContext);

  useEffect(() => {
    const featchData = async () => {
      let data = await getCategeoryes();
      setCategories(data.$values);
    };
    featchData();
  }, [getCategeoryes]);

  const HandelDeleteCat = (id) => {
    deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handelUpdateCat = (res) => {
    setCategories(res.$values);
  };

  return (
    <>
      <div className="row col-md-12 m-auto">
        <div className="col-md-12 row d-flex justify-content-between align-items-center">
          <div className="col-md-8">
            <h1>categorys</h1>
          </div>
          <div className="col-md-4">
            <Link to="/addCategory" className="btn btn-primary">
              Add Category
            </Link>
          </div>
        </div>
        <table class="table table-dark table-striped-columns">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, index) => { return(
                <>
                 <tr key={index}>
                  <th scope="row">{category.id.substring(0,5)}</th>
                  <td >{category.name}</td>
                  <td>{category.description.substring(0,55)}</td>
                  <td className="HelpersBtns">
                
                    {
                      <EditCatModal
                        categoryData={category}
                        UpdateCat={handelUpdateCat}
                      />
                    }
                     {
                      <DeleteModal
                        DeleteCat={HandelDeleteCat}
                        catId={category.id}
                      />
                    }
                  </td>
                 
                </tr>
                </>
              )
               
              })}
          </tbody>
        </table>

        {/* {categories &&
          categories.map((category, index) => {
            return (
              <div key={index} className="col-md-4 my-2">
                <div className="card bg-black" style={{ width: "18rem" }}>
                  <div className="card-body bg-dark text-white-50">
                    <h5 className="card-title">
                      <b>Name</b> <br />
                      {category.name}
                    </h5>
                    <p className="card-text">
                      <b>Description:</b>
                      <br /> {category.description}
                    </p>
                    <hr class="hr" />
                    <div className="HelpersBtns">
                      <EditCatModal
                        categoryData={category}
                        UpdateCat={handelUpdateCat}
                      />

                      <DeleteModal
                        DeleteCat={HandelDeleteCat}
                        catId={category.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })} */}
      </div>
    </>
  );
}
