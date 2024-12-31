'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";


async function MoreLikeThis({ relevantmoviePromise }) {
  
  setTimeout(()=>{
     console.log('loading');
     
  },3000)
  
  const more_like_this = await relevantmoviePromise;
  return (
    <>
      <div class="container mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold mb-4">More Like This</h2>

        <div class="flex space-x-4 overflow-x-auto pb-4">
          <div class="flex w-48 h-[288px] rounded-lg cursor-pointer hover:scale-105 transition-transform"></div>
          {more_like_this.results.map((more) => (
            <div className="relative flex-shrink-0 w-48 cursor-pointer hover:scale-105 transition-transform">
              <Link href={`/movie/${more.id}`}>
                <Image
                  fill
                  src={`https://image.tmdb.org/t/p/original/${more.poster_path==null?'/':more.poster_path||more.backdrop_path}`}
                  alt={more.original_title}
                  className="w-full rounded-lg object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MoreLikeThis;
