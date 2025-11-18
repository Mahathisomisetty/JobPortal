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

    // ✅ UPDATE USER
  updateUser: builder.mutation({
  query: ({ id, ...body }) => ({
    url: `/users/updateUser/${id}`,
    method: "PUT",
    body: body,
  }),
}),
getAllJobs: builder.query({
  query: () => "/jobs/all",
}),



  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation, useGetAllJobsQuery,
} = apiSlice;
