import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Heart } from "lucide-react";
import Comment from "./Comment";
import { Link } from "react-router-dom";

function Card({ id, author, date, title, content }) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

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
          onClick={() => setIsHeartClicked(!isHeartClicked)}
          color="red"
          fill={isHeartClicked ? "red" : "none"}
        />
      </div>
      {isCommentClicked ? (
        <Comment setIsCommentClicked={setIsCommentClicked} />
      ) : null}
    </div>
  );
}

export default Card;
