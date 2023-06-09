import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UserList = () => {

  const {data:users, isLoading, isSuccess, isError, error} = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

  let content 

  if(isLoading) content = <p>Loading...</p>

  if(isError) content = <p>{error?.data?.message}</p>

  if(isSuccess) {
    const {ids} = users
    const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

    content = (
      <table>
        <thead>
          <tr>
            <th>Kullanıcı Adı</th>
            <th>Düzenle</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default UserList