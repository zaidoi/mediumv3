import Avatar from "@mui/material/Avatar";
import Navbar from "../Components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [date, setDate] = useState();
  const [deleteRes, setDeleteRes] = useState(false);
  const [ownerOfBlog, setOwnerOfBlog] = useState(false);

  useEffect(() => {
    if (!id) return navigate("/blogs");

    const fetchBlog = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL}/api/blog/${id}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const blogCreatedAt = res.data.blog.createdAt;
        console.log(res.data)
        setBlog(res.data.blog);

        const date = new Date(blogCreatedAt).toLocaleDateString("en-GB", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setDate(date);

        if (res.data.author == true) {
          setOwnerOfBlog(true);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async (blogId) => {
    if (!blogId) return;
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/api/blog/${blogId}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setDeleteRes(res.data.message);
      setTimeout(() => navigate("/blogs"), 2000);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      {deleteRes ? (
        <div className="flex text-xl justify-center text-red-500 mt-10">
          <p>Blog deleted!</p>
        </div>
      ) : (
        <>
          {blog ? (
            <div className=" flex-col  px-2   md:p-0 flex  md:flex-row justify-center gap-8 mt-4">
              <div className="flex flex-col max-w-3xl gap-3">
                <h1 className=" text-2xl md:text-4xl font-medium wrap-break-word">
                  {blog.title}
                </h1>
                <p className="text-gray-400"> Posted on {date}</p>
                <p className=" text-md text-left font-light break-all px-1">
                  {blog.content}
                </p>
                <div>
                  {ownerOfBlog && (
                    <button
                      className="bg-red-500 text-white px-2 rounded"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2>Author</h2>
                <div className="flex items-center gap-2">
                  <Avatar />
                  <h3>{blog.author.username}</h3>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mt-2 animate-pulse md:text-xl">
              <p>Loading...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Blog;
