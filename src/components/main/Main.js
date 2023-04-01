import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div className='form__div'>
      <form>
        <label htmlFor='username' className='form__label-username'> 
          <FontAwesomeIcon icon={faUser} className='form__label-username-icon' />
          <br/>KULLANICI ADI:
        </label><br/>
        <label htmlFor='room' className='form__label-room'>
          <FontAwesomeIcon icon={faChartBar} className='form__label-username-icon' />
        </label>
        <label htmlFor='select' className='form__label-select'>ODA SEÇ</label>
          <select name='room' id='select' className='form__select'>
            <option value="room1">ODA1</option>
            <option value="room2">ODA2</option>
          </select>
        <Link to='/main/messages'><button className='form__button'>KATIL</button></Link>
      </form>
      
    </div>
  )
}

export default Main