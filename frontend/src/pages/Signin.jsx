import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-around">
        <div className="p-2 px-4 text-center bg-white rounded-lg w-80 h-max">
          <Heading label={"Sign In"}></Heading>
          <Subheading
            label={"Enter your credentials to access your account"}
          ></Subheading>
          <Inputbox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label={"Email"}
            placeholder={"komal@gmail.com"}
          ></Inputbox>
          <Inputbox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"218ygdew"}
          ></Inputbox>
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username: username,
                    password: password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              label={"Sign in"}
            ></Button>
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};
