import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
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
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        {
          username,
          password,
        }
      );
      localStorage.setItem("Token", response.data.Token);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else if (error.response?.data?.Message) {
          setErrorMessage(error.response.data.Message);
        } else {
          setErrorMessage("Signin failed. Please try again.");
        }
      } else {
        setErrorMessage("Signin failed. Please try again.");
      }
    }
  }
  return (
    <div className="min-h-screen w-full flex flex-col justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-slate-900">Alzheimer</span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-xl border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            Sign In
          </h1>
          <p className="text-slate-600 text-center mb-8">
            Access your second brain
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <Input reference={usernameRef} placeholder="Username"></Input>
              <p className="text-slate-400 text-[10px] mt-1 italic px-1">
                Username: 5–100 characters long.
              </p>
            </div>
            <div>
              <Input reference={passwordRef} placeholder="Password" type="password"></Input>
              <p className="text-slate-400 text-[10px] mt-1 italic px-1">
                Password: 8–16 chars with upper, lower &amp; special symbol.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="primary"
              text="Sign In"
              size="md"
              fullWidth={true}
              loading={false}
              onClick={signin}
            ></Button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
