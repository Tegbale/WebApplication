import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export default () => {
  // create an axios custom instance
  const api = axios.create({
    baseURL: url,
  });

  // create an interceptor to handle responses
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      let message = null;
      let fieldErrors = null; // variable to hold field errors

      try {
        if (error.response.status === 401) {
          if (import.meta.env.NODE_ENV === "development")
            console.log("You are unauthorized...401");
          // store.dispatch('auth/LogoutUser')
        } else if (error.response.status === 400) {
          if (import.meta.env.NODE_ENV === "development")
            console.log("It's a bad request...400");
        } else if (error.response.status === 404) {
          if (import.meta.env.NODE_ENV === "development")
            console.log("It was not found...404");
        }

        if (import.meta.env.NODE_ENV === "development") {
          console.log(JSON.stringify(error.response, null, 2));
        }

        message = error.response.data.message;
        fieldErrors = error.response.data.errors; // assign field errors to variable
      } catch (e) {
        if (import.meta.env.NODE_ENV === "development") {
          console.log("Error in axios interceptor: " + e);
        }
      }

      // return the error message and field errors as an object
      return Promise.reject({ message, fieldErrors });
    }
  );

  return api;
};
