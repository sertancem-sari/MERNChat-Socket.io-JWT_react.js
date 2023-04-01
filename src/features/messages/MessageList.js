import React from 'react'
import { useGetMessagesQuery } from './messageApiSlice'
import Message from './Message'

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
      <table>
        <thead>
          <tr>
            <th>Messagename</th>
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

export default MessageList