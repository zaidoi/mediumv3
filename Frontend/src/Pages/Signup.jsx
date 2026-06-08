import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import axios from "axios";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");

  const responseTimer = () => {
    setTimeout(() => setResponse(""), 3000);
  };

  const handleSubmit = async (e, value) => {
    e.preventDefault();
    try {
       await axios.post(
        `${import.meta.env.VITE_URL}/api/user/signup`,
        value,
      );
      navigate("login");
    } catch (error) {
      console.log(error);
      setResponse(error.response.data.message);
      responseTimer();
    }
  };
  return (
    <div className="h-screen flex justify-center md:grid grid-cols-2 ">
      <div className="flex flex-col justify-center items-center">
        {" "}
        <Form type={"signup"} handleSubmit={handleSubmit} />
        {response && (
          <p className=" flex gap-1 text-red-700 items-center  text-md font-medium absolute top-10  shadow-lg rounded  min-w-25 p-2 max-w-2xs ">
           <div class="animate-spin [animation-duration:2.4s] h-5 w-5 border-4 border-red-700 border-t-transparent rounded-full"></div>
            {response}
          </p>
        )}
      </div>

      <div className=" hidden md:flex  justify-center items-center bg-gray-300 animate-pulse">
        <div className="flex flex-col justify-center  w-3xl gap-1">
          <div className="md:text-3xl md:font-semibold">
            "The customer service I received was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="font-semibold">
            Zaid Badgujar <br />
            <span className="text-gray-500 font-normal">CEO,Acme Inc</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
