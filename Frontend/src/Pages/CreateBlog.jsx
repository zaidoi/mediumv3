import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createBlogRes, setCreateBlogRes] = useState(false);
  const navigate = useNavigate();

  const handleBlogPublish = async () => {
    if (!title || !content) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/blog`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setCreateBlogRes(res.data.message);
      setTimeout(() => {
        setCreateBlogRes(false)
        navigate("/blogs")
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="flex shadow-xs p-5 justify-around">
       <Link to={"/blogs"}> <h1 className="text-xl">Medium</h1></Link>
        <button className="bg-green-600 text-white rounded px-2 py-1" onClick={handleBlogPublish}>
          Publish
        </button>
      </div>
      {createBlogRes ? (
        <div className="flex justify-center text-green-600 mt-10"><p>{createBlogRes}</p></div>
      ) : (
        <div className="flex justify-center mt-5">
          <div className="flex flex-col w-3xl">
            <textarea
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              onInput={(e) =>{
                e.target.style.height = "auto",
                e.target.style.height =  e.target.scrollHeight + 'px'
              }}
              className=" p-2 m-2 text-3xl rounded overflow-hidden resize-none outline-0"
            />
            <textarea
              name="content"
              id="content"
              placeholder="Tell your Story..."
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
              rows="1"
              className="p-2 text-xl outline-none overflow-hidden resize-none"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateBlog;
