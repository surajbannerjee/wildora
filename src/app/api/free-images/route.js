import { NextResponse } from "next/server";
import { searchFreeImages, FREE_IMAGE_PROVIDERS } from "@/services/freeImageService";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "wildlife safari";
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  try {
    const images = await searchFreeImages(query, limit);
    return NextResponse.json({
      success: true,
      query,
      providers: FREE_IMAGE_PROVIDERS,
      count: images.length,
      images,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to search free images",
      },
      { status: 500 }
    );
  }
}
