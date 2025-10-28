import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/icons/Logo";

export const Signup = () => {
  console.log("stuck");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  console.log(usernameRef);
  console.log(passwordRef);
  async function signup() {
    console.log("signup() called");
    const username = usernameRef.current?.value;
    console.log(username);
    const password = passwordRef.current?.value;
    try {
      const params = new URLSearchParams();
      if (username) params.append("username", username);
      if (password) params.append("password", password);
      const response = await axios.post(`${BACKEND_URL}/v1/signup`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: false,
      });
      console.log(response.data);
      alert("You have signed up");
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Signup failed. Please try again.");
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center">
      <div className="text-4xl font-semibold py-9 flex items-center justify-center ">
        <div className="pr-4 text-purple-600 text-shadow-lg">
          <Logo></Logo>
        </div>
        <div className="text-purple-600 text-shadow-xs">Alzheimer</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white rounded-xl min-w-48 p-8 border border-purple-600">
          <Input reference={usernameRef} placeholder="Username"></Input>
          <div className="text-gray-500 text-xs text-start italic px-3 ">
            {" "}
            Username: 5–100 characters long.
          </div>
          <Input reference={passwordRef} placeholder="Password"></Input>

          <div className="text-gray-500 text-xs text-start italic px-3 ">
            {" "}
            Password: 8–16 chars with upper, <br></br>lower & special symbol.
          </div>

          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              text="Signup"
              size="md"
              fullWidth={true}
              loading={false}
              onClick={signup}
            ></Button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-3 px-3 text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <span className="text-sm text-neutral-700 py-6">
          Already have an account?{" "}
          <span className="text-purple-600 font-semibold">
            <Link to="/signin">Signin</Link>
          </span>
        </span>
      </div>
    </div>
  );
};
