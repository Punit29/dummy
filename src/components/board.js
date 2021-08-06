import React from 'react';
import { Link } from 'react-router-dom';

const Board = props => {
  return (
    <div>
      <Link to={`/board/${props.boards.id}`}>
        <div className='columncss'>
          <div className='cardcss'>
            <h3>{props.boards.name}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Board;
