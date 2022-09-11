import http from "../http/instanceAxios";
import { defineStore } from "pinia";
import { ref } from "vue";
import instanceAxios from "../http/instanceAxios";

export const AuthServices = defineStore({
    id: "AuthServices",
    state: () => ({
        user_id: ref(""),

        //user_login = true if the user is authenticated, otherwise it is false;
        user_login: ref(false),

        //registration status;
        status_register: ref(""),
        message_error_register: ref(""),

        //Login status;
        status_login: ref(""),
        login_error: ref(""),

        status_forgotpassword: ref(""),
        response_forgotpassword: ref(""),

        status_resetpassword: ref(""),
        response_resetpassword: ref(""),
    }),

    actions: {
        async userCart(payload) {
            try {
                await http.axiosInstance
                    .post("/api/usercart", payload)
                    .then((response) => {
                        return response;
                    });
            } catch (error) {
                console.error(error);
            }
        },

        async registerUser(payload) {
            try {
                await http.axiosInstance.get("/sanctum/csrf-cookie");
                await http.axiosInstance.post("/register", payload).then((response) => {
                    this.status_register = response.status;
                });
            } catch (error) {
                this.status_register = error.response.status;
                this.message_error_register = error.response.data.message;
            }
        },

        async getUseridRegister(user_email) {
            try {
                await http.axiosInstance
                    .get("/api/userid/" + user_email)
                    .then((response) => {
                        this.user_id = response.data[0].id;
                    });
            } catch (error) {
                console.error(error);
            }
        },

        async loginUser(payload) {
            try {
                //initialize CSRF protection for the application;
                await http.axiosInstance.get("/sanctum/csrf-cookie");
                await http.axiosInstance.post("/login", payload).then((response) => {
                    this.status_login = response.status;
                    this.user_id = response.data.user_id;

                    if (response.data["already_auth"]) {
                        console.log("utente già autenticato");
                    } else {
                        this.user_login = true;
                    }
                });
            } catch (error) {
                this.status_login = error.response.status;
                this.login_error = error.response.data.message;
            }
        },

        async logout() {
            try {
                await http.axiosInstance.post("/logout").then(() => {
                    this.user_login = false;
                    this.user_id = "";

                    if (this.status_login !== "") {
                        this.status_login = "";
                    }

                    if (this.status_register.value !== "") {
                        this.status_register = "";
                    }
                });
            } catch (error) {
                console.error(error);
            }
        },

        //check if there is an authenticated user or not;
        async checkLoginUser() {
            try {
                await http.axiosInstance.get("/sanctum/csrf-cookie");

                await http.axiosInstance.get("/api/authUser").then((response) => {
                    this.user_login = true;
                    return this.user_login;
                });
            } catch (error) {
                if (error.response.status == 401) {
                    console.log("error Unauthorized:" + error.response.status);
                    this.user_login = false;
                    return error.response.status;
                }

            }
        },

        async forgotPassword(payload) {
            try {
                await instanceAxios.axiosInstance.get("/sanctum/csrf-cookie");
                await instanceAxios.axiosInstance
                    .post("/forgot-password", payload)
                    .then((response) => {
                        this.status_forgotpassword = response.status;
                        this.response_forgotpassword = response.body;
                        return response;
                    });
            } catch (error) {
                this.response_forgotpassword = error.response.data.message;
                this.status_forgotpassword = error.response.status;
            }
        },
        async resetPassword(payload) {
            try {
                await instanceAxios.axiosInstance.get("/sanctum/csrf-cookie");
                await instanceAxios.axiosInstance
                    .post("/reset-password", payload)
                    .then((response) => {
                        this.status_resetpassword = response.status;
                        return { status: response.status, body: response.body };
                    });
            } catch (error) {
                this.status_resetpassword = error.response.status;
                this.response_resetpassword = error.response.data.message;
                return error.response.data.message;
            }
        },
    },

    persist: true,
});