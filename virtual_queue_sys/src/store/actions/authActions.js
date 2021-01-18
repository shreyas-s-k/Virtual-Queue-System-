import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const base_url = "http://127.0.0.1:5000";
export const userSignup = (user) => {
  const url = base_url + "/auth/signup";
  return (dispatch) => {
    axios({
      method: "post",
      url: url,
      data: user,
    })
      .then((res) => {
        console.log(res.code);
        dispatch({ type: "REG_SUCCESS", res });
      })
      .catch((err) => {
        dispatch({ type: "REG_FAILED", err });
      });
  };
};

export const userLogin = (user) => {
  const url = base_url + "/auth/login";
  return (dispatch) => {
    axios({
      method: "post",
      url: url,
      data: user,
      withCredentials: true,
      referrerPolicy: "origin-when-cross-origin",
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem("login", "true");
        localStorage.setItem("user", user.id);
        // console.log(res.headers["Set-Cookie"]);
        // Cookies.set("Authenticated", "True");
        dispatch({ type: "AUTH_SUCCESS", res });
      })
      .catch((err) => {
        console.log(err.response.data.code);
        console.log(err.response.data);
        dispatch({ type: "AUTH_FAILED", err });
      });
  };
};
// export const userLogin = (user) => {
//     const url = base_url + "/auth/login";
//     return (dispatch) => {
//         fetch(url, {
//             method: "POST",
//             body: JSON.stringify(user),
//             credentials: "same-origin",
//             referrerPolicy: "strict-origin-when-cross-origin",
//         })
//             .then((res) => {
//                 console.log(res);
//                 localStorage.setItem("login", "true");
//                 localStorage.setItem("user", user.id);
//                 Cookies.set("Authenticated", "True");
//                 dispatch({ type: "AUTH_SUCCESS", res });
//             })
//             .catch((err) => {
//                 console.log(err.response);
//                 console.log(err.response);
//                 dispatch({ type: "AUTH_FAILED", err });
//             });
//     };
// };

export const userLogout = () => {
  const url = base_url + "/auth/logout";
  return (dispatch) => {
    axios({
      method: "get",
      url: url,
      data: null,
    })
      .then((res) => {
        console.log(res);
        localStorage.clear();
        // Cookies.set("Authenticated", "False");
        dispatch({ type: "LOGOUT_SUCCESS" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
