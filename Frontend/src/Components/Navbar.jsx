import { Link, useNavigate } from "react-router-dom"


function Navbar() {
    const navigate = useNavigate()
    const handleCreateBlog = () => {
        navigate('/cblog')
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div className='flex justify-between p-5 shadow-xs rounded'>
        <Link to={"/blogs"}><div className=' text-xl md:text-2xl font-serif'>
            Medium
        </div></Link>
        <div className='flex gap-2'>
            <button className='bg-green-600 text-white px-2 text-sm md:text-md rounded hover:bg-green-800' onClick={handleCreateBlog}>Create Blog</button>
            <button className='bg-red-500 text-white px-2  text-sm md:text-md rounded hover:bg-green-800' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar