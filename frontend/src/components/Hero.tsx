import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="flex flex-wrap justify-center items-center mt-20">
      <div className="flex flex-wrap flex-col justify-center items-center">
        <h1 className="tracking-tight  shadow-xl text-7xl text-purple-600 font-semibold text-center w-fit rounded ">
          Your Second Brain
        </h1>
        <div className="text-center mt-8 tex-2xl text-neutral-500">
          Organize content from multiple sources <br /> such as Twitter,
          YouTube, and Google Docs — into a centralized knowledge hub.
        </div>
        <div className=" text-purple-600  text-start rounded-lg  border border-purple-600 py-1 px-2 bg-neutral-100 mt-8">
          <Link to="https://github.com/Vrushabh-Damle/Alzheimer">
            {" "}
            Go to github ➜
          </Link>
        </div>
      </div>
    </div>
  );
};
