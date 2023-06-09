import React from 'react'
import { useSelector } from 'react-redux'
import { selectMessageById } from './messageApiSlice'
import useAuth from '../../hook/useAuth'

const Message = ({messageId}) => {
  const { username } = useAuth()
  const message = useSelector(state => selectMessageById(state, messageId))
  console.log( message.username === username)
  if(message) {
    const right = message.username === username ? "message__screen" : "message__screen-right"
    const rightEach = message.username === username ? "each-message-sentence" : "each-message-sentence-right"
    
    return (
        <tr className={right}>
          <div className='message__container'>
            <td className={rightEach}>
              {message.username}:{message.sentence}
            </td>
          </div>
        </tr>
    )

  }else {
    return null
  }
}

export default Message