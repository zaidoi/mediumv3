import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllBlog() {
  const [allBlogs, setAllBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function fetchBlogs() {
      if (!token) return navigate("/login");

      const res = await axios.get(`${import.meta.env.VITE_URL}/api/blog`, {
        headers: {
          Authorization: token,
        },
      });

      setAllBlogs(res.data.allBlog);
    
    }

    fetchBlogs();
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
       
        {allBlogs ? (
          <>
            {" "}
            {allBlogs.map((blog) => (
              <Card
                id={blog._id}
                author={blog.author.username}
                title={blog.title}
                content={blog.content}
                date={blog.createdAt}
              />
            ))}
          </>
        ) : (
          <p className="text-xl absolute top-50 animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default AllBlog;
