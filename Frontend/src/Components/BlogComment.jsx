

function BlogComment({author,text}) {
  return (
    <div className="flex max-w-md md:min-w-xl flex-col gap-1 bg-gray-100 rounded p-2 mt-1">
        <h1 className="font-semibold">{author}</h1>
        <p className="break-normal md:break-all">{text}</p>
    </div>
  )
}

export default BlogComment