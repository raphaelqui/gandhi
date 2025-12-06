export interface GooglePlacesReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlacesResult {
  name: string;
  rating: number;
  reviews: GooglePlacesReview[];
}

export interface GooglePlacesResponse {
  result: GooglePlacesResult;
  status:
    | "OK"
    | "ZERO_RESULTS"
    | "NOT_FOUND"
    | "INVALID_REQUEST"
    | "OVER_QUERY_LIMIT"
    | "REQUEST_DENIED"
    | "UNKNOWN_ERROR";
  error_message?: string;
}

export interface ReviewsApiResponse {
  reviews: GooglePlacesReview[];
  totalReviews: number;
}

export interface ReviewsApiError {
  error: string;
}
