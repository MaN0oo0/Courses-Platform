export default function fetchData(url, _method, data) {
  const options = {
    method: `${_method}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: data,
  };
  const promise = fetch(`https://localhost:7014/api${url}`, options)
    .then((response) => response.json())
    .then((data) => data);

  return wrapPromise(promise);
}
function wrapPromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  return {
    read() {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    },
  };
}
