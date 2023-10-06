import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
//uses rtk query


const baseQuery= fetchBaseQuery({ baseUrl: '' });
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder)=> ({}),
});






