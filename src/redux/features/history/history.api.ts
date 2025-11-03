import { baseApi } from "@/redux/baseApi";

export const historyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    riderFeedback: builder.mutation({
      query: ({id,data}) => ({
        url: `/history/rider-feedback/${id}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["HISTORY"],
    }),
   updateHistoryRider: builder.mutation({
      query: ({id,payload}) => ({
        url: `/history/rider-feedback/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["HISTORY"],
    }),
   updateHistoryDriver: builder.mutation({
      query: ({id,ratting}) => ({
        url: `/history/driver-feedback/${id}`,
        method: "PATCH",
        data: ratting,
      }),
      invalidatesTags: ["HISTORY"],
    }),

  }),
});

export const {
  useRiderFeedbackMutation,
  useUpdateHistoryRiderMutation,
  useUpdateHistoryDriverMutation
} = historyApi;
