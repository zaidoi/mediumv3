import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Comment({ setIsCommentClicked, blogId }) {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleComment = async (value) => {
    
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    try {
       await axios.post(
        `${import.meta.env.VITE_URL}/api/comment/${blogId}`,
        {
          text: value,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
       setIsCommentClicked(false)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="w-full flex gap-3 mt-2 px-3">
      <textarea
        className="shadow-xs w-6/7 outline-0 resize-none overflow-hidden"
        onInput={(e) => {
          ((e.target.style.height = "auto"),
            (e.target.style.height = e.target.scrollHeight + "px"));
        }}
        onChange={(e) => setComment(e.target.value)}
        name="comment"
        id="comment"
        placeholder="Add a comment"
        value={comment}
      ></textarea>
      <div className="w-1/7 ">
        <button
          className="px-2 py-1 bg-gray-300 rounded"
          onClick={() => handleComment(comment)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Comment;
