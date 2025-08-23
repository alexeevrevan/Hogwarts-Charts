interface IApiConfig {
  baseUrl: string;
  endpoints: {
    characters: string;
  };
}

export const apiConfig: IApiConfig = {
  baseUrl: "https://hp-api.onrender.com/api",
  endpoints: {
    characters: "/characters",
  },
};
