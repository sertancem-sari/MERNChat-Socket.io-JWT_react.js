import React from 'react'
import { Link } from 'react-router-dom'

const MainHeader = () => {
  return (
    <header>
      <nav>
        <ul className='main__header-ul'>
          <Link to='/main'><li>ANASAYFA</li></Link>
          <Link to='/main/users'><li>AYARLAR</li></Link>
          <Link to='/'><li>GİRİŞ YAP</li></Link>
        </ul>
      </nav>
      <Link to='/main/users/new' className='main__header-link'><li className='main__header-sign'>KAYIT OL</li></Link>
    </header>
  )
}

export default MainHeader