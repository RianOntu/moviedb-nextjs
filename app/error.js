"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-600">Something went wrong!</h1>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}