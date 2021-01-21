import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;

const base_url = "http://127.0.0.1:5000";
export const userSignup = (user) => {
    const url = base_url + "/auth/signup";
    return (dispatch) => {
        dispatch({ type: 'LOADING', action: true })
        axios({
            method: "post",
            url: url,
            data: user,
        })
            .then((res) => {
                console.log(res.code);
                dispatch({ type: "REG_SUCCESS", res });
                user_login({ id: user.id, password: user.password }, dispatch)

            })
            .catch((err) => {
                dispatch({ type: "REG_FAILED", err });
            });
    };
};

function user_login(user, dispatch) {
    const url = base_url + "/auth/login";
    dispatch({ type: 'LOADING', action: true })
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
            console.log(err.response);
            console.log(err.response);
            dispatch({ type: "AUTH_FAILED", err });
        });
};


export const userLogin = (user) => {


    return (dispatch) => {
        user_login(user, dispatch)
    }
    //     dispatch({ type: 'LOADING', action: true })
    //     axios({
    //         method: "post",
    //         url: url,
    //         data: user,
    //         withCredentials: true,
    //         referrerPolicy: "origin-when-cross-origin",
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             localStorage.setItem("login", "true");
    //             localStorage.setItem("user", user.id);
    //             // console.log(res.headers["Set-Cookie"]);
    //             // Cookies.set("Authenticated", "True");
    //             dispatch({ type: "AUTH_SUCCESS", res });
    //         })
    //         .catch((err) => {
    //             console.log(err.response);
    //             console.log(err.response);
    //             dispatch({ type: "AUTH_FAILED", err });
    //         });
    // };
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
        dispatch({ type: 'LOADING', action: true })
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
