import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "/node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import ErrorBoundary from "./Helpers/ErrorBoundary";
import Loading from "./Components/Assets/Loading/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
