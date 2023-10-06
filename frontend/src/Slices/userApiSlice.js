import { apiSlice } from "./apiSlice";

const USERS_URL ='/api/users';
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}`,
                method:'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query:() => ({
                url:`${USERS_URL}/logout`,
                method:'POST',
                
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/profile`,
                method:'PUT',
                body: data,
            }),
        }),
        getMembers: builder.query({
            query: () => `${USERS_URL}/members`,
            providesTags: ["MembersList"],
        }),
        addMember: builder.mutation({
            query: (data) => ({
                url:`${USERS_URL}/add`,
                method:'POST',
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url:`${USERS_URL}/${userId}`,
                method : 'DELETE',
            }),
        }),
        updateSpecificMember: builder.mutation({
            query: ({id,data}) => ({
                url:`${USERS_URL}/${id}`,
                method:'PUT',
                body: data,
            }),
        }),
        toggleSuspension : builder.mutation({
            query: ({id, data}) => ({
                url:`${USERS_URL}/${id}`,
                method:"PATCH",
                body: data,
            })
        })
        
        
        
        })

           
        
    })


export const { 
    useLoginMutation, 
    useLogoutMutation , 
    useRegisterMutation,
    useUpdateUserMutation,
    useGetMembersQuery, 
    useAddMemberMutation,
    useUpdateSpecificMemberMutation,
    useToggleSuspensionMutation,
    useDeleteUserMutation} = usersApiSlice;