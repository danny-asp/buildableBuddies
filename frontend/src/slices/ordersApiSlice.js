import { apiSlice } from './apiSlice';
import { BASE_URL, ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: `${BASE_URL}/api/orders/`,
                method: 'POST',
                body: order,
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `${BASE_URL}/api/orders/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${BASE_URL}/api/orders/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
        }),
        getPaypalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: `${BASE_URL}/api/orders/mine`,
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: `${BASE_URL}/api/orders/`,
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPaypalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
} = orderApiSlice;