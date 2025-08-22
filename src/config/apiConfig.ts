interface ApiConfig {
  baseUrl: string;
  endpoints: {
    characters: string;
  };
}

export const apiConfig: ApiConfig = {
  baseUrl: "https://hp-api.onrender.com/api",
  endpoints: {
    characters: "/characters",
  },
};
