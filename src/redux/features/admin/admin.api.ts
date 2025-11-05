import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🧍 Get all users (with filters & pagination)
    getUsers: builder.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
      providesTags: ["USER"],
    }),

    // ✏️ Update user info
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),

    // 🚫 Block / Unblock user
    toggleUserBlock: builder.mutation({
      query: ({ id, block }) => ({
        url: `/admin/users/${id}/block`,
        method: "PATCH",
        params: { block },
      }),
      invalidatesTags: ["USER"],
    }),

    // ✅ Approve / Suspend driver
    approveDriver: builder.mutation({
      query: ({ id, isApproved }) => ({
        url: `/admin/drivers/${id}/approval`,
        method: "PATCH",
        data: { isApproved },
      }),
      invalidatesTags: ["USER"],
    }),

    // ❌ Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),

    // 🚗 Get rides (with filters)
    getRides: builder.query({
      query: (params) => ({
        url: "/admin/rides",
        method: "GET",
        params,
      }),
      providesTags: ["RIDE"],
    }),

    // 📊 Dashboard analytics
    getDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // 👤 Update admin profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/admin/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    // 🔒 Change admin password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/admin/profile/password",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useToggleUserBlockMutation,
  useApproveDriverMutation,
  useDeleteUserMutation,
  useGetRidesQuery,
  useGetDashboardQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = adminApi;
