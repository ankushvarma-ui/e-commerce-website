import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ 
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error) {
    // Ensure error object has proper structure
    if (!result.error.data) {
      result.error.data = { message: result.error.status?.toString() || 'An error occurred' };
    } else if (!result.error.data.message && result.error.data.error) {
      result.error.data.message = result.error.data.error;
    }
  }
  
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
