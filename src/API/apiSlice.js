import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),//backend url
    tagTypes: ['User'],//to invalidated cached data
    endpoints: builder => ({})//endpoints will be extended
})