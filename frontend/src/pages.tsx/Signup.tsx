import { Input } from "../components/Input";
import { Button } from "../components/ui/Button";
export const Signup = () => {
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-48 p-8 borderl">
        <Input placeholder="Username"></Input>
        <Input placeholder="Password"></Input>
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            text="Signup"
            size="md"
            fullWidth={true}
            loading={false}
          ></Button>
        </div>
      </div>
    </div>
  );
};
