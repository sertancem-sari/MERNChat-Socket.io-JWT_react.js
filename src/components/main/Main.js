import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser } from "@fortawesome/free-solid-svg-icons"

const Main = () => {
  return (
    <div className='form__div'>
      <form>
        <label htmlFor='username' className='form__label-username'> 
          <FontAwesomeIcon icon={faUser} className='form__label-username-icon' />
          <br/>KULLANICI ADI:CEM
        </label><br/>
        <label htmlFor='room' className='form__label-room'>
          <FontAwesomeIcon icon={faChartBar} className='form__label-username-icon' />
        </label>
        <label htmlFor='select' className='form__label-select'>ODA SEÇ</label>
          <select name='cars' id='select' className='form__select'>
            <option value="volvo">ODA1</option>
            <option value="volvo">ODA2</option>
          </select>
        <button className='form__button'>KATIL</button>
      </form>
      
    </div>
  )
}

export default Main