import { baseUrl } from "../../constants/routes.js";

import axios from "axios";

class Backend {
  constructor() {
    this.isAuthenticated = false;
    if (localStorage.getItem("access_token") != null) {
      this.isAuthenticated = true;
    }
    this.headers = null;
    this.backend = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
        accept: "application/json"
      }
    });
    this.backend.interceptors.response.use(
      response => response,
      error => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.response.statusText === "Unauthorized"
        ) {
          const refresh_token = localStorage.getItem("refresh_token");

          return this.backend
            .post("/token/refresh/", { refresh: refresh_token })
            .then(response => {
              localStorage.setItem("access_token", response.data.access);
              localStorage.setItem("refresh_token", response.data.refresh);

              this.backend.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return this.backend(originalRequest);
            })
            .catch(err => {
              console.log(err);
            });
        }
        return Promise.reject(error);
      }
    );

    console.log("It has been mounted");
    console.log("locoal storage ", localStorage.getItem("refresh_token"));
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.backend
        .get("/token/getUser/")
        .then(response => {
          console.log("USER IS ", response.data[0]);
          const user = response.data[0];
          localStorage.setItem("user_id", user["id"]);
          localStorage.setItem("user_username", user["username"]);
          console.log("username is ", user["username"]);
          console.log("user id is ", user["id"]);
          resolve(user["username"]);
        })
        .catch(error => {
          reject(null);
        });
    });
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.backend
        .post("/token/obtain/", {
          username,
          password
        })
        .then(response => {
          this.backend.defaults.headers["Authorization"] =
            "JWT " + response.data.access;
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
          this.isAuthenticated = true;
          console.log("logged in successfully");
          this.getUser();
          resolve(true);
        })
        .catch(error => {
          console.log("error info", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          reject(new Error(error.message));
        });
    });
  }

  signup(body) {
    return new Promise((resolve, reject) => {
      this.backend
        .post("/token/userCreate/", body)
        .then(response => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  logout() {
    console.log("refresh token is ", localStorage.getItem("refresh_token"));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_username");
    this.backend.defaults.headers["Authorization"] = null;
    this.isAuthenticated = false;
  }

  create(body) {
    const author = localStorage.getItem("user_id");
    body["author"] = author;
    console.log("sent body is ", body);

    return new Promise((resolve, reject) => {
      this.backend
        .post("/v1/", body)
        .then(response => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  view(id) {
    return new Promise((resolve, reject) => {
      this.backend
        .get(`/v1/${id}/`)
        .then(response => {
          console.log(response.data[0]);
          resolve(response.data);
        })
        .catch(error => {
          console.log("error occured");
          reject(new Error(error.message));
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.backend.delete(`/v1/${id}/`).then(
        response => {
          console.log(response.data);
          resolve(true);
        },
        error => {
          console.log("error info", error);
          reject(new Error(error.message));
        }
      );
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      this.backend
        .get("/v1/")
        .then(response => {
          console.log(response.data[0]);
          resolve(response.data);
        })
        .catch(error => {
          console.log("error occured");
          reject(new Error(error.message));
        });
    });
  }

  update(id, body) {
    console.log("id is ", id);
    console.log("body is ", body);
    return new Promise((resolve, reject) => {
      this.backend.put(`/v1/${id}/`, body).then(
        response => {
          console.log(response.data);
          resolve(true);
        },
        error => {
          console.log("error info", error);
          reject(new Error(error.message));
        }
      );
    });
  }
}

export default Backend;
