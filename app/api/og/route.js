import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "My website";
  const image = searchParams.get("image") || "";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={image} alt="" />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
