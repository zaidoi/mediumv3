import Form from "../Components/Form";

function Signup() {
  return (
    <div className="h-screen flex justify-center md:grid grid-cols-2 ">

      <div className="flex justify-center items-center">
        {" "}
        <Form type={"signup"} />
      </div>

      <div className=" hidden md:flex  justify-center items-center bg-gray-300">
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
