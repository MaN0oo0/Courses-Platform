import { createContext } from "react";
import React from "react";
import api from "../Helpers/HandleAuthentication";

export let CategeoryContext = createContext({});

export default function CategeoryContextProvider(props) {
  const getCategeoryes = async () => {
    try {
      let { data } = await api.get("/Categeory");
      return data;
    } catch (error) {
      localStorage.removeItem("token");
    }
  };
  const deleteCategory = async (id) => {
    try {
      await api.delete(`/Categeory/${id}`);
    } catch (error) {}
  };
  const editCategory = async (id, body, callback) => {
    try {
        await api.put(`/Categeory/${id}`, body);

      callback(await getCategeoryes());
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  return (
    <CategeoryContext.Provider
      value={{ getCategeoryes, deleteCategory, editCategory }}
    >
      {props.children}
    </CategeoryContext.Provider>
  );
}
