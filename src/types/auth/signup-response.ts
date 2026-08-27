export interface SignupResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    tokenType: string;
    expiresIn: string;
    user: {
      _id: string;
      name: string;
      username: string;
      email: string;
      photo: string;
      cover: string;
    };
  };
}
