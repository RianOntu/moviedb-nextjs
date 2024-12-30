import { ImageResponse } from "next/og";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const hasTitle = searchParams.has("title");

    const title = hasTitle ? searchParams.get("title") : "My website";

    return new ImageResponse(
       
        {
            width: 1200,
            height: 600,
        }
    );
}