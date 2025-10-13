import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";

export const Signup = () => {
  console.log("stuck");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  console.log(usernameRef);
  console.log(passwordRef);
  async function signup() {
    console.log("signup() called");
    const username = usernameRef.current?.value;
    console.log(username);
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        username,
        password,
      });
      console.log(response.data);
      alert("You have signed up");
    } catch (error) {
      console.error("Signup failed : ", error);
      alert("Signup failed");
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
            text="Signup"
            size="md"
            fullWidth={true}
            loading={false}
            onClick={signup}
          ></Button>
        </div>
      </div>
    </div>
  );
};
