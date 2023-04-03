import React from 'react'
import { useState, useEffect } from 'react'
import { useAddNewUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons"

const NewUser = () => {

  const [addNewUser, {isLoading, isSuccess, isError, error}] = useAddNewUserMutation()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if(isSuccess) {
      setUsername('')
      setPassword('')
      navigate('/main/users')
    }
  },[isSuccess, navigate]) 

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)

  const onSaveUser = async (e) => {
    e.preventDefault()
    await addNewUser({username, password})
  }
  const errMessage = (!isLoading || isError) ? <p>{error?.data?.message}</p> : null
  const content = (
    <div className='form__new-div'>
      <form className='form__new' onSubmit={onSaveUser}>
        {errMessage}
        <h1 className='form__new-header'>YENİ KULLANICI</h1>
        <label htmlFor='username' className='form__label-new-username'> 
          <FontAwesomeIcon icon={faUser} className='form__label-new-username-icon' />
          <br/>KULLANICI ADI:
        </label><br/>
        <input
          id='username'
          name='username'
          value={username}
          type='text'
          autoComplete='off'
          onChange={onUsernameChange}
          className='form__input-new'
        />
        <label htmlFor='username' className='form__label-username'> 
          <FontAwesomeIcon icon={faKey} className='form__label-new-parola-icon' />
          <br/>PAROLA:
        </label><br/>
        <input
          id='password'
          name='password'
          value={password}
          type='password'
          onChange={onPasswordChange}
          className='form__input-new'
        />
        <button className='form__button-new-save'>KAYDET</button>
      </form>
    </div>
  )

  return content
}

export default NewUser