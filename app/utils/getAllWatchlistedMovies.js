'use client'
export async function GetAllWatchlistedMovies() {
  const authData = JSON.parse(localStorage.getItem("auth"));
const userEmail=authData.email;

  if (!userEmail) return;

  try {
    const res = await fetch(`/api/addToWatchList?email=${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const movies = await res.json();
  
    return movies;
  
  } catch (err) {
    console.log(err.message);
    
  }

 
}
