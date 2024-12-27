import React from "react";

function AddedToWatchLaterBtn({ children,movieID }) {
    
  return (
    <>
      <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
        {children}
      </button>
    </>
  );
}

export default AddedToWatchLaterBtn;
