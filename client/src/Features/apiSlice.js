import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  endpoints: (builder) => ({
    // REGISTER USER
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // LOGIN USER
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // GET USER BY ID
   getUserById: builder.query({
  query: (id) => `/users/getUser/${id}`,
}),

  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserByIdQuery,
} = apiSlice;
