import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../API/apiSlice";

const usersAdapter = createEntityAdapter({}) //to get ids and entities of data
const initialState = usersAdapter.getInitialState() //getting initial state
//injecting endpoints to the apiSlice
export const userApiSLice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUsers: builder.query({
            query: () => '/users',//request to backen url
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError//optional
            },
            keepUnusedDataFor: 5,//normally default 60seconds,
            transformResponse: responseData => {
                const loadedUser = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUser)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'User', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                }else return {type: 'User', id:'LIST'}
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                {type: 'User', id:"LIST"}
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApiSLice

//to get the query result object
export const selectUsersResult = userApiSLice.endpoints.getUsers.select()
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data //getting ids and entities from result object
)

//selecting all selectors with getSelectors
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)