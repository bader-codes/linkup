export interface ProfileUser {
  _id: string;
  id: string;

  name: string;
  username: string;
  email: string;

  dateOfBirth: string;
  gender: string;

  photo: string;
  cover: string;

  bookmarks: string[];
  followers: string[];
  following: string[];

  createdAt: string;

  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: ProfileUser;
    isFollowing: boolean;
  };
}