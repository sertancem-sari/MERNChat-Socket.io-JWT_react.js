import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'

const User = ({userId}) => {
  
  const user = useSelector(state => selectUserById(state, userId))
  
  const navigate = useNavigate()

  if(user) {
    const handleEdit = () => navigate(`/main/users/${userId}`)

    return (
        <tr>
            <td>{user.username}</td>
            <td>
                <button onClick={handleEdit}>Edit Button</button>
            </td>
        </tr>
    )

  }else {
    return null
  }
}

export default User