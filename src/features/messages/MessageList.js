import React from 'react'
import { useGetMessagesQuery } from './messageApiSlice'
import Message from './Message'
import NewMessage from './NewMessage'



const MessageList = () => {

  const {data:messages, isLoading, isSuccess, isError, error} = useGetMessagesQuery()


  let content 

  if(isLoading) content = <p>Loading...</p>

  if(isError) content = <p>{error?.data?.message}</p>

  if(isSuccess) {
    const {ids} = messages
    const tableContent = ids?.length
            ? ids.map(messageId => <Message key={messageId} messageId={messageId} />)
            : null

    content = (
      <table className='messages-table'>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <div className='messages-main'>
            <div className='messages-content'>{tableContent}</div> 
            <div className='messages__new'><NewMessage /></div>
          </div>
        </tbody>
      </table>
    )
  }

  return content
}

export default MessageList