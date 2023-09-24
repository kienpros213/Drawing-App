import { Stack } from "@chakra-ui/react";
import axios from "axios";

function Login() {

    const endpoint = "http://localhost:3030"

    function sendPost() {
        console.log("" + endpoint + "/auth/login")
        const username = document.getElementsByClassName("username")
        const password = document.getElementsByClassName("password")
        console.log(username[0].value, password[0].value)
        axios({
            method: "post",
            url: "" + endpoint + "/auth/login",
            data: {
                "username": username[0].value,
                "password": password[0].value,
            }
        })
            .then(function (response) {
                console.log(response.data.access_token);
            })
    }

    return (
        <>
            <Stack dir="vertical">
                <input className="username" name="username" placeholder="username" />
                <input className="password" name="password" placeholder="password" />
                <button type="button" onClick={sendPost}> submit </button>
            </Stack>
        </>
    );

}

export default Login