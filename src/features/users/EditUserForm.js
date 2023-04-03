import React from 'react'
import { useState, useEffect } from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons"


const EditUserForm = ({user}) => {

  const [updateUser, {isLoading, isSuccess , isError, error}] = useUpdateUserMutation()
  console.log(isSuccess)
  const [deleteUser, { 
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
    error: errorDelete
  }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')

  useEffect(() => {
    
    if(isSuccess || isDeleteSuccess){
        setUsername('')
        setPassword('')
        navigate('/main/users')
    }
  }, [isSuccess, isDeleteSuccess, navigate])

  const onUsernameChange = e => setUsername(e.target.value)
  const onPasswordChange = e => setPassword(e.target.value)

  const onUserSave = async (e) => {
    await updateUser({id: user.id, username, password})
  }

  const onUserDelete = async (e) => {
    await deleteUser({id: user.id})
  }

  const errMessage = (!isLoading || isError) ? <span>{error?.data?.message}</span> : null
  const errDeleteMessage = (!isLoading || isDeleteError) ? <span>{errorDelete?.data?.message}</span> : null
  
  const content = (
    <div className='form__edit-div'>
        <form className='form__edit' onSubmit={e => e.preventDefault()}>
            <span>{errMessage}</span>
            <span>{errDeleteMessage}</span>
            <label htmlFor='username' className='form__label-edit-username'> 
                <FontAwesomeIcon icon={faUser} className='form__label-edit-username-icon' />
                <br/>KULLANICI ADI:
            </label><br/>
            <input
                id='username'
                name='username'
                value={username}
                type='text'
                autoComplete='off'
                onChange={onUsernameChange}
                className='form__input-edit'
            />
            <label htmlFor='username' className='form__label-username'> 
                <FontAwesomeIcon icon={faKey} className='form__label-edit-username-icon' />
                <br/>PAROLA:
            </label><br/>
            <input 
                id='password'
                name='password'
                value={password}
                type='password'
                onChange={onPasswordChange}
                className='form__input-edit'
            />
            <div className='form__buttons-edit'>
              <button
                  title='save'
                  onClick={onUserSave}
                  className='form__button-edit-save'
              >KAYDET
              </button>
              <button
                  title='delete'
                  onClick={onUserDelete}
                  className='form__button-edit-delete'
              >SİL
              </button>
            </div>
        </form>
    </div>
  )

  return content
}

export default EditUserForm