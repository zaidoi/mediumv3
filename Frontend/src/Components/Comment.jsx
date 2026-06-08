function Comment({ setIsCommentClicked }) {
  return (
    <div className="w-full flex gap-3 mt-2 px-3">
      <textarea
        className="shadow-xs w-6/7 outline-0"
        name="comment"
        id="comment"
        placeholder="Add a comment"
      ></textarea>
      <div className="w-1/7 ">
        <button
          className="px-2 py-1 bg-gray-300 rounded"
          onClick={() => setIsCommentClicked(false)}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Comment;
