import React from 'react';
import { Link } from 'react-router-dom';
//import boards from './boards';
// import { MdHome } from "react-icons/md";

function Header() {
  return (
    <header className='header'>
      <Link to='/'>
      
      </Link>
      <Link to='/boards'>
        <button className='btn btn-outline-light boardButton'>Boards</button>
      </Link>
      <div className='trello-img'>
        <img
          src='https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png'
          alt='none'
        />
      </div>
    </header>
  );
}

export default Header;
