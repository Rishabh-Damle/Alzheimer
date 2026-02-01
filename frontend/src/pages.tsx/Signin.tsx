import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/icons/Logo";
import { Link } from "react-router-dom";
export const Signin = () => {
  console.log("stuck");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  console.log(usernameRef);
  console.log(passwordRef);
  async function signin() {
    console.log("signin() called");
    const username = usernameRef.current?.value;
    console.log(username);
    const password = passwordRef.current?.value;
    try {
      const params = new URLSearchParams();
      if (username) params.append("username", username);
      if (password) params.append("password", password);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/signin`,
        params,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: false,
        }
      );
      localStorage.setItem("Token", response.data.Token);
      //redirect the user to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Signin failed. Please try again.");
    }
  }
  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-transparent px-4">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center">
          <div className="pr-3 text-purple-600">
            <Logo></Logo>
          </div>
          <div className="text-purple-700 text-2xl font-semibold tracking-tight">
            Alzheimer
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-md border border-purple-100">
          <h1 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Sign in to your brain
          </h1>
          <div className="space-y-1.5 mb-4">
            <Input reference={usernameRef} placeholder="Username"></Input>
            <p className="text-gray-500 text-xs text-start italic px-1.5">
              Username: 5–100 characters long.
            </p>
          </div>
          <div className="space-y-1.5 mb-4">
            <Input reference={passwordRef} placeholder="Password"></Input>
            <p className="text-gray-500 text-xs text-start italic px-1.5">
              Password: 8–16 chars with upper, lower &amp; special symbol.
            </p>
          </div>
          <div className="flex justify-center pt-2">
            <Button
              variant="primary"
              text="Signin"
              size="md"
              fullWidth={true}
              loading={false}
              onClick={signin}
            ></Button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-3 text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <span className="text-sm text-neutral-700 py-6 text-center">
          Don’t have an account? Don’t worry,{" "}
          <span className="text-purple-600 font-semibold">
            <Link to="/signup">Signup</Link>
          </span>
        </span>
      </div>
    </div>
  );
};
