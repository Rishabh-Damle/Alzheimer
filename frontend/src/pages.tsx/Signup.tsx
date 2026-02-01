import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/icons/Logo";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      alert("You have signed up");
      navigate("/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMessage("User already exists. Please sign in.");
        } else if (error.response?.data?.Message) {
          setErrorMessage(error.response.data.Message);
        } else if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Signup failed. Please try again.");
        }
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
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
            Create your account
          </h1>
          <div className="space-y-1.5 mb-4">
            <Input reference={usernameRef} placeholder="Username"></Input>
            <p className="text-gray-500 text-xs text-start italic px-1.5">
              Username: 5–100 characters long.
            </p>
          </div>
          <div className="space-y-1.5 mb-4">
            <Input reference={passwordRef} placeholder="Password" type="password"></Input>
            <p className="text-gray-500 text-xs text-start italic px-1.5">
              Password: 8–16 chars with upper, lower &amp; special symbol.
            </p>
          </div>
          <div className="flex justify-center pt-2">
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
            <p className="text-red-500 text-sm mt-3 text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <span className="text-sm text-neutral-700 py-6 text-center">
          Already have an account?{" "}
          <span className="text-purple-600 font-semibold">
            <Link to="/signin">Signin</Link>
          </span>
        </span>
      </div>
    </div>
  );
};
