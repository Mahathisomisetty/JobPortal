// File: src/Features/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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

    // UPDATE USER
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/updateUser/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // GET ALL JOBS
    getAllJobs: builder.query({
      query: () => "/jobs/all",
    }),

    // GET SINGLE JOB BY ID
    getJobById: builder.query({
      query: (id) => `/jobs/getJob/${id}`,
    }),

    // ⭐ GET APPLICATIONS OF LOGGED-IN USER
    getUserApplications: builder.query({
      query: (userId) => `/applyjob/user/${userId}`,
    }),

  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserByIdQuery,
  useGetJobByIdQuery,
  useUpdateUserMutation,
  useGetAllJobsQuery,
  useGetUserApplicationsQuery,
} = apiSlice;
