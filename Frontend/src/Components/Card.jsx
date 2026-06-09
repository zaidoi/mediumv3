import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Heart } from "lucide-react";
import Comment from "./Comment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Card({ id, author, date, title, content }) {
  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  
  useEffect(() => {
    const fetchLikedBlogs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/like/usercheck/${id}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        setIsHeartClicked(res.data.liked)
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchLikedBlogs()
  },[id])

  const handleHeartClicked = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    setIsHeartClicked(!isHeartClicked);
    try {
      await axios.get(`${import.meta.env.VITE_URL}/api/like/${id}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const dateParse = new Date(date).toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className=" min-w-sm sm:min-w-3xl max-w-3xl p-3 shadow-2xs flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Avatar>{author[0].toUpperCase()}</Avatar>
        <h2 className="font-medium">
          {author[0].toUpperCase() + author.slice(1)}
        </h2>
        <p className="text-gray-500">{dateParse}</p>
      </div>
      <div>
        <Link to={`/blog/${id}`}>
          <h1 className="font-bold md:text-xl wrap-break-word">{title}</h1>
        </Link>
        <p className="font-light md:text-md truncate">{content}</p>
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="shadow-2xs px-2 py-1 bg-gray-200 rounded"
          onClick={() => setIsCommentClicked(!isCommentClicked)}
        >
          Comment
        </button>
        <Heart
          onClick={() => {
            handleHeartClicked(id);
          }}
          color="red"
          fill={isHeartClicked ? "red" : "none"}
        />
      </div>
      {isCommentClicked ? (
        <Comment setIsCommentClicked={setIsCommentClicked} blogId={id} />
      ) : null}
    </div>
  );
}

export default Card;
