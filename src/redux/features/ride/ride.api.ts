import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRideRequest: builder.mutation({
      query: (rideInfo) => ({
        url: "/rides/request",
        method: "POST",
        data: rideInfo,
      }),
        invalidatesTags: ["RIDE"],
    }),

    cancelRide: builder.mutation({
      query: ({ rideId }) => ({
        url: `/${rideId}/cancel`,
        method: "POST",
      }),
        invalidatesTags: ["RIDE"],

    }),

    rideHistory: builder.query({
      query: () => ({
        url: "/rides/history",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),
  }),
});

export const {
  useCreateRideRequestMutation,
  useCancelRideMutation,
  useRideHistoryQuery,
} = rideApi;
