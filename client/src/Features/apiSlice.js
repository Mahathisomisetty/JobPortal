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

  tagTypes: ["Jobs"],

  endpoints: (builder) => ({

    // REGISTER USER
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // LOGIN
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // GET USER
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

    // ========= ⭐ JOB CRUD API ENDPOINTS ⭐ =========

    // CREATE JOB
    createJob: builder.mutation({
      query: (body) => ({
        url: "/jobs/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // GET JOBS POSTED BY RECRUITER
    getRecruiterJobs: builder.query({
      query: (recruiterId) => `/jobs/recruiter/${recruiterId}`,
      providesTags: ["Jobs"],
    }),

    // UPDATE JOB
    updateJob: builder.mutation({
      query: ({ id, body }) => ({
        url: `/jobs/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // DELETE JOB
    deleteJob: builder.mutation({
      query: ({ id }) => ({
        url: `/jobs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // GET ALL JOBS
    getAllJobs: builder.query({
      query: () => "/jobs/all",
      providesTags: ["Jobs"],
    }),

    // GET SINGLE JOB
    getJobById: builder.query({
      query: (id) => `/jobs/getJob/${id}`,
    }),

    // GET APPLICATIONS OF LOGGED USER
    getUserApplications: builder.query({
      query: (userId) => `/applyjob/user/${userId}`,
    }),
    
    //upload pdf file(resume)
    uploadPDF: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("resume", file);

        return {
          url: "/upload/resume",
          method: "POST",
          body: formData,
        };
      },
    }),

  }),
});

// Export Hooks
export const {
  useRegisterUserMutation, useLoginUserMutation,useGetUserByIdQuery,
  useUpdateUserMutation,useCreateJobMutation,
  useGetRecruiterJobsQuery,useUpdateJobMutation,useDeleteJobMutation,
  useGetAllJobsQuery,useGetJobByIdQuery,useGetUserApplicationsQuery,
   useUploadPDFMutation,
} = apiSlice;
