import React from 'react'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messageApiSlice'

const Message = ({messageId}) => {
  
  const message = useSelector(state => selectMessageById(state, messageId))

  if(message) {

    return (
        <tr>
            <td className='each-message'>{message.sentence}</td>
        </tr>
    )

  }else {
    return null
  }
}

export default Message