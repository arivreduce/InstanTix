import { apiSlice } from './apiSlice';
const USERS_URL = 'api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    searchAPI: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/search`,
        method: 'POST',
        body: data,
      }),
    }),
    addFavorite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addFav`,
        method: 'POST',
        body: data,
      }),
    }),
    getFavorites: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/getFavs`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteFav: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/deleteFav`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useSearchAPIMutation,
  useAddFavoriteMutation,
  useGetFavoritesMutation,
  useDeleteFavMutation,
} = usersApiSlice;
