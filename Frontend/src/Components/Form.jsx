import { Link } from "react-router-dom";

function Form({ type }) {
  return (
    <div className=" p-2 flex  flex-col gap-4">
      <div className="flex  flex-col justify-center items-center">
        <h2 className=" text-3xl   md:text-3xl font-black">
          Create an account
        </h2>
        <p className="   text-base md:text-normal">
          {type === "signup" ? (
            <>
              Already have an account?{" "}
              <Link className="underline text-gray-500" to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link className="underline text-gray-500" to="/">
                Signup
              </Link>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {type == "signup" && (
          <>
            <label className="md:text-lg" htmlFor="">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="border-gray-500 outline-none border-r border-l px-2 py-1 rounded"
            />{" "}
          </>
        )}
        <label className="md:text-lg" htmlFor="">
          Email
        </label>
        <input
          type="text"
          placeholder="xyz@gmail.com"
          className="border-gray-500 outline-none border-r border-l px-2 py-1 rounded"
        />
        <label className="md:text-lg" htmlFor="">
          Password
        </label>
        <input
          type="text"
          placeholder="Enter atleast 6 digit"
          className="border-gray-500 outline-none border-r border-l px-2 py-1 rounded"
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-black text-white py-2 px-5 rounded  hover:bg-gray-800 focus:outline-2  focus:outline-yellow-500">
          {type === "signup" ? "Signup" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Form;
