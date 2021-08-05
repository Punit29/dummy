import React from 'react';
const Card = props => {
  return (
    <div onClick={() => props.openModal(props.cards)} className='cardDiv'>
      <h6 className='cardName'>{props.cards.name}</h6>
      <div>
        <button
          onClick={event => props.deleteCard(event, props.cards.id)}
          className='deleteButton btn btn-xsm'>
          <i className='fa fa-trash'></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
