import Link from 'next/link'
import React from 'react'

function Twitter({url}) {
    return (
        <Link
        className="text-center cursor-pointer"
        href={`https://twitter.com/intent/tweet?url=${url}&text=Check%20this%20out!`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="http://x.com/favicon.ico"
          alt="twitter"
          className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
        />
        <p className="text-sm">Twitter</p>
      </Link>
    )
}

export default Twitter
