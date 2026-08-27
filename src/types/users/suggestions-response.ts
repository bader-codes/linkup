export interface SuggestedUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
  mutualFollowersCount: number;
  followersCount: number;
  following: boolean;
}

export interface SuggestionsResponse {
  success: boolean;
  message: string;
  data: {
    suggestions: SuggestedUser[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      numberOfPages: number;
      nextPage: number | null;
    };
  };
}
