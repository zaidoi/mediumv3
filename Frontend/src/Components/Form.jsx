import { useState } from "react";
import { Link } from "react-router-dom";

function Form({ type, handleSubmit }) {
  const [formDetail, setFormDetail] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <div className=" p-2 flex  flex-col gap-4 ">
      <div className="flex  flex-col justify-center items-center">
        <h2 className=" text-3xl   md:text-3xl font-black">
          {type === "signup" ? "Create an Account" : "Login to Account"}
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
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => handleSubmit(e, formDetail)}
      >
        {type == "signup" && (
          <>
            <label className="md:text-lg" htmlFor="">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your Username"
              className="border-gray-500 outline-none border-r border-l px-2 py-1 rounded"
              required
              onChange={(e) =>
                setFormDetail({ ...formDetail, username: e.target.value })
              }
              value={formDetail.username}
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
          required
          onChange={(e) =>
            setFormDetail({ ...formDetail, email: e.target.value })
          }
          value={formDetail.email}
        />
        <label className="md:text-lg" htmlFor="">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter atleast 6 digit"
          className="border-gray-500 outline-none border-r border-l px-2 py-1 rounded"
          required
          onChange={(e) =>
            setFormDetail({ ...formDetail, password: e.target.value })
          }
          value={formDetail.password}
        />
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="bg-black text-white py-2 px-5 rounded  hover:bg-gray-700 hover:px-6 hover:py-3"
          >
            {type === "signup" ? "Signup" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
