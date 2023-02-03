import axios from "axios";

const url = "https://tegbale.krobotechnologies.com/api/";

export default () => {
  //create an axios custom instance
  const api = axios.create({
    baseURL: url,
  });

  // create an interceptor to handle responses
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      let error_message = null;
      try {
        if (error.response.status === 401) {
          if (import.meta.env.NODE_ENV === "development")
            console.log("you are unauthorized...401");
          //  store.dispatch('auth/LogoutUser')
        } else if (error.response.status === 400) {
          if (import.meta.env.NODE_ENV === "development")
            console.log("it's a bad request...400");
        } else if (error.response.status === 404) {
          if (import.meta.env.NODE_ENV === "development")
            console.log("it was not found...404");
        }

        if (import.meta.env.NODE_ENV === "development") {
          console.log(JSON.stringify(error.response, null, 2));
        }

        //console.log(JSON.stringify(error, null, 2))

        error_message = error.response.data.message;
      } catch (e) {
        if (import.meta.env.NODE_ENV === "development") {
          console.log("error in axios interceptor: " + e);
        }
      }

      return Promise.reject(error_message);
    }
  );

  return api;
};
