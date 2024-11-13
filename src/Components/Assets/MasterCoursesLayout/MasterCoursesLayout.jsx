import React from "react";

export default function MasterCoursesLayout({ children }) {
  return (
    <>
      <div className="row p-3 col-md-12 my-3 bg-secondary mb-2 d-flex justify-content-center gap-2 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
