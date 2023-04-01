import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../API/apiSlice";

const messagesAdapter = createEntityAdapter({}) //to get ids and entities of data
const initialState = messagesAdapter.getInitialState() //getting initial state
//injecting endpoints to the apiSlice
export const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getMessages: builder.query({
            query: () => '/messages',//request to backen url
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError//optional
            },
            /* keepUnusedDataFor: 5, *///normally default 60seconds,
            transformResponse: responseData => {
                const loadedMessage = responseData.map(message => {
                    message.id = message._id
                    return message
                });
                return messagesAdapter.setAll(initialState, loadedMessage)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'Message', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Message', id}))
                    ]
                }else return {type: 'Message', id:'LIST'}
            },
        }),
        addNewMessage: builder.mutation({
            query: initialMessageData => ({
                url: '/messages',
                method: 'POST',
                body: {
                    ...initialMessageData,
                }
            }),
            invalidatesTags: [
                {type: 'Message', id:"LIST"}
            ]
        }),
    }),
})

export const {
    useGetMessagesQuery,
    useAddNewMessageMutation,
} = messageApiSlice

//to get the query result object
export const selectMessagesResult = messageApiSlice.endpoints.getMessages.select()
const selectMessagesData = createSelector(
    selectMessagesResult,
    messagesResult => messagesResult.data //getting ids and entities from result object
)

//selecting all selectors with getSelectors
export const {
    selectAll: selectAllMessages,
    selectById: selectMessageById,
    selectIds: selectMessagesIds
} = messagesAdapter.getSelectors(state => selectMessagesData(state) ?? initialState)