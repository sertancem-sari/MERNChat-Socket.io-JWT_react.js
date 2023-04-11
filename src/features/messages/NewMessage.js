import React, { useEffect, useState } from 'react'
import { useAddNewMessageMutation } from './messageApiSlice'
import { io } from "socket.io-client"
import useAuth from '../../hook/useAuth'

const socket = io('http://localhost:3500')

const NewMessage = () => {
    const { username } = useAuth()
    const [addNewMessage] = useAddNewMessageMutation()

    const [message, setMessage] = useState("")
    const sendMessage= () => {
        socket.emit("send message", {message, username})
    }

    useEffect(() => {
        socket.on("receive message", (data) => {
            addNewMessage(data.message)
        })
        setMessage('')
    }, [addNewMessage])

    const onSaveMessage = async (e) => {
        e.preventDefault()
        await addNewMessage({sentence:message, username})
    }

    const content = (
        <>
            <div className='message-body'>
                <form className='message-form' onSubmit={onSaveMessage}>
                    <div className='dene'>
                        <label htmlFor='message-input'>Message</label>
                        <input className='message__new-input' type='text' id='message-input' autoComplete='off' onChange={(e) => setMessage(e.target.value)}/>
                        <button className='message-buttons' type='submit' id='send-button' onClick={sendMessage}>Gönder</button>
                    </div>
                    <div className='dene'>
                        <label htmlFor='room-input'>Room</label>
                        <input className='message__new-input' type='text' id='room-input'/>
                        <button className='message-buttons' type='button' id='room-button'>Katıl</button>
                    </div>
                </form>
            </div>
        </>
    )

    return content
}

export default NewMessage