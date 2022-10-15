import http from "../http/instanceAxios";
import { defineStore } from "pinia";
import { ref } from "vue";
import instanceAxios from "../http/instanceAxios";

export const AuthServices = defineStore({
    id: "authServices",
    state: () => ({
        userId: ref(""),

        //userLogin = true if the user is authenticated, otherwise it is false;
        userLogin: ref(false),

        //registration status;
        statusRegister: ref(""),
        messageErrorRegister: ref(""),

        //Login status;
        statuslogin: ref(""),
        loginerror: ref(""),

        statusForgotpassword: ref(""),
        responseForgotpassword: ref(""),

        statusResetpassword: ref(""),
        responseResetpassword: ref(""),
    }),

    actions: {
        async registerUser(payload) {
            try {
                await http.axiosInstance.get("/sanctum/csrf-cookie");
                await http.axiosInstance.post("/register", payload).then((response) => {
                    this.statusRegister = response.status;
                    this.statuslogin = 200;
                });
            } catch (error) {
                this.statusRegister = error.response.status;
                this.messageErrorRegister = error.response.data.message;
            }
        },
        //retrieve user "id" after registration;
        async getUseridRegister(user_email) {
            try {
                await http.axiosInstance
                    .get("/api/users/" + user_email)
                    .then((response) => {
                        this.userId = response.data[0].id;
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
                    this.statuslogin = response.status;
                    this.userId = response.data.user_id;

                    if (response.data["already_auth"]) {
                        console.log("utente già autenticato");
                    } else {
                        this.userLogin = true;
                    }
                });
            } catch (error) {
                this.statuslogin = error.response.status;
                this.loginerror = error.response.data.message;
            }
        },

        async logout() {
            try {
                await http.axiosInstance.post("/logout").then(() => {
                    this.userLogin = false;
                    this.userId = "";
                    if (this.statuslogin !== "") {
                        this.statuslogin = "";
                    }
                    if (this.statusRegister !== "") {
                        this.statusRegister = "";
                    }
                    if (this.messageErrorRegister !== "") {
                        this.messageErrorRegister = "";
                    }
                    if (this.loginerror !== "") {
                        this.loginerror = "";
                    }
                    if (this.statusForgotpassword !== "") {
                        this.statusForgotpassword = "";
                    }
                    if (this.responseForgotpassword !== "") {
                        this.responseForgotpassword = "";
                    }
                    if (this.statusResetpassword !== "") {
                        this.statusResetpassword = "";
                    }
                    if (this.responseResetpassword !== "") {
                        this.responseResetpassword = "";
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

                await http.axiosInstance.get("/api/users").then((response) => {
                    console.log("statuslogin:" + response.status);
                });
            } catch (error) {
                if (error.response.status == 401) {
                    console.log("error Unauthorized:" + error.response.status);
                    this.userLogin = false;
                    this.userId = "";
                    this.statuslogin = error.response.status;
                }
            }
        },

        async forgotPassword(payload) {
            try {
                await instanceAxios.axiosInstance.get("/sanctum/csrf-cookie");
                await instanceAxios.axiosInstance
                    .post("/forgot-password", payload)
                    .then((response) => {
                        this.statusForgotpassword = response.status;
                        this.responseForgotpassword = response.data.message;
                        return response;
                    });
            } catch (error) {
                this.responseForgotpassword = error.response.data.message;
                this.statusForgotpassword = error.response.status;
            }
        },
        async resetPassword(payload) {
            try {
                await instanceAxios.axiosInstance.get("/sanctum/csrf-cookie");
                await instanceAxios.axiosInstance
                    .post("/reset-password", payload)
                    .then((response) => {
                        this.statusResetpassword = response.status;
                        return { status: response.status, body: response.body };
                    });
            } catch (error) {
                this.statusResetpassword = error.response.status;
                this.responseResetpassword = error.response.data.message;
                return error.response.data.message;
            }
        },
    },
    persist: true,
});