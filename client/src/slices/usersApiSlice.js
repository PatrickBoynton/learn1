import { apiSlice } from './apiSlice'
import { USERS_URL } from '../constants'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['Users'],
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
} = usersApiSlice
