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
    <div className="w-full max-w-3xl p-3 shadow-2xs flex flex-col gap-2 rounded-lg">
  <div className="flex gap-2 items-center flex-wrap">
    <Avatar>{author[0].toUpperCase()}</Avatar>

    <h2 className="font-medium break-words">
      {author[0].toUpperCase() + author.slice(1)}
    </h2>

    <p className="text-gray-500 text-sm">{dateParse}</p>
  </div>

  <div>
    <Link to={`/blog/${id}`}>
      <h1 className="font-bold text-lg md:text-xl break-words">
        {title}
      </h1>
    </Link>

    <p className="font-light text-sm md:text-base line-clamp-2 break-words">
      {content}
    </p>
  </div>

  <div className="flex gap-3 items-center">
    <button
      className="shadow px-3 py-1 bg-gray-200 rounded"
      onClick={() => setIsCommentClicked(!isCommentClicked)}
    >
      Comment
    </button>

    <Heart
      onClick={() => handleHeartClicked(id)}
      color="red"
      fill={isHeartClicked ? "red" : "none"}
      className="cursor-pointer shrink-0"
    />
  </div>

  {isCommentClicked && (
    <Comment
      setIsCommentClicked={setIsCommentClicked}
      blogId={id}
    />
  )}
</div>
  );
}

export default Card;
