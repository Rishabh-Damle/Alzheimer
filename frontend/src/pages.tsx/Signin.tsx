import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
  console.log("stuck");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  console.log(usernameRef);
  console.log(passwordRef);
  async function signin() {
    console.log("signin() called");
    const username = usernameRef.current?.value;
    console.log(username);
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username,
        password,
      });
      localStorage.setItem("Token", response.data.Token);
      //redirect the user to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin called : ", error);
      alert("Signin failed");
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-48 p-8 borderl">
        <Input reference={usernameRef} placeholder="Username"></Input>
        <Input reference={passwordRef} placeholder="Password"></Input>
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Signin"
            size="md"
            fullWidth={true}
            loading={false}
            onClick={signin}
          ></Button>
        </div>
      </div>
    </div>
  );
};
