import React from "react";

function RemoveWatcLaterBtn({movieId}) {
  return (
    <>
      <button className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
        Remove
      </button>
    </>
  );
}

export default RemoveWatcLaterBtn;
