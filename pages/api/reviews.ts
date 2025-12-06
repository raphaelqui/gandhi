import type { NextApiRequest, NextApiResponse } from "next";
import type {
  GooglePlacesReview,
  GooglePlacesResponse,
} from "@/types/google-places";

interface ApiResponse {
  reviews?: GooglePlacesReview[];
  totalReviews?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = "ChIJqygvxqbhvkcRhI3_dp3UNyo"; // Gandhi Haus Bonn

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    // Hole Place-Details inkl. Bewertungen
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews,rating&key=${apiKey}&language=de`
    );

    const data: GooglePlacesResponse = await response.json();

    if (data.status !== "OK") {
      return res.status(500).json({
        error: `Google Places API error: ${data.status}`,
      });
    }

    // Filtere 4- und 5-Sterne-Bewertungen
    const validReviews = data.result.reviews
      ? data.result.reviews.filter(
          (review) => review.rating === 4 || review.rating === 5
        )
      : [];

    // Mische die Reihenfolge zufällig durch
    const shuffled = validReviews.sort(() => Math.random() - 0.5);

    // Nimm 8 zufällige Bewertungen
    const randomReviews = shuffled.slice(0, 8);

    return res.status(200).json({
      reviews: randomReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({
      error: "Failed to fetch reviews",
    });
  }
}
