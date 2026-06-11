import axios from "axios";
import Form from "../Components/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [errorResponse, setErrorResponse] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const handleTimer = () => {
    setTimeout(() => setErrorResponse(""), 3000);
  };

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    const { email, password } = value;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/user/login`,
        {
          email: email,
          password: password,
        },
      );
      setLoadingState(true);
      localStorage.setItem("token", res.data.token);
      navigate("/blogs");
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      setErrorResponse(error.response.data.message);
      handleTimer();
    }
  };

  return (
    <div className="h-screen">
      {loadingState ? (
        <div className=" h-screen flex justify-center items-center md:text-2xl animate-pulse ">
          {" "}
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className="flex justify-center text-xl md:text-4xl font-bold font-mono">
            <h1 className="absolute mt-30 md:mt-30 md:ml-15 border-2 p-3 rounded  border-t-transparent">
              Welcome to Zaid's Medium Clone
            </h1>
          </div>
          <div className="flex justify-center items-center h-full">
            <Form type={"login"} handleSubmit={handleSubmit} />
            {errorResponse && (
              <p className=" flex gap-1 absolute top-10 text-red-700  p-2 shadow-lg min-w-25 max-w-2xs">
                <div className="border-4 animate-spin [animation-duration:3s] border-red-700 h-5 w-5 rounded-full border-t-transparent"></div>
                {errorResponse}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
