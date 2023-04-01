import React, { useEffect, useState } from 'react'
import { useAddNewMessageMutation } from './messageApiSlice'
import { io } from "socket.io-client"

const socket = io('http://localhost:3500')

const NewMessage = () => {

    const [addNewMessage, {isSuccess}] = useAddNewMessageMutation()

    const [message, setMessage] = useState("")
    const [received, setReceived] = useState("")
    const sendMessage= () => {
        socket.emit("send message", {message})
    }

    useEffect(() => {
        socket.on("receive message", (data) => {
            setReceived(data.message)
        })
    }, [socket])

    const onSaveMessage = async (e) => {
        e.preventDefault()
        await addNewMessage({sentence:message})
    }
   
    const content = (
        <>
            <div className='message-body'>
                <div id='message-container'></div>
                <form id='message-form' onSubmit={onSaveMessage}>
                    <label htmlFor='message-input'>Message</label>
                    <input type='text' id='message-input' onChange={(e) => setMessage(e.target.value)}/>
                    <button type='submit' id='send-button' onClick={sendMessage}>Send</button>
                    <label htmlFor='room-input'>Room</label>
                    <input type='text' id='room-input'/>
                    <button type='button' id='room-button'>Join</button>
                    <h1 className='random'>Message:{received}</h1>
                </form>
            </div>
        </>
    )

    return content
}

export default NewMessage