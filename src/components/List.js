import React, { Component } from 'react';
import Card from './Card';
import Form from './Form';
const token =
  '421401dc0406c370d37fcae4d35286fca589168586da4d3d914aa56f04324919';
const key = '0411d596f676963925b6cdc26d6adbbf';

class List extends Component {
  state = {
    cards: [],
    hideDiv: false,
    inputValue: ''
  };
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/lists/${this.props.lists.id}/cards?key=${key}&token=${token}`,
      {
        // method: 'GET'
      }
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({
          cards: data
        });
      });
  }
  openHideDiv = () => {
    this.setState({
      hideDiv: true
    });
  };
  closeInputDiv = () => {
    this.setState({
      hideDiv: false
    });
  };
  inputState = event => {
    this.setState({
      inputValue: event.target.value
    });
  };
  addNewCard = async () => {
    //console.log(this.props.lists.id);

    await fetch(
      `https://api.trello.com/1/cards?idList=${this.props.lists.id}&name=${this.state.inputValue}&keepFromSource=all&key=${key}&token=${token}`,
      {
        method: 'POST'
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          cards: this.state.cards.concat([data]),
          inputValue: ''
        });
      });
  };

  deleteCard = (event, id) => {
    event.stopPropagation();
    fetch(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`, {
      method: 'DELETE'
    }).then(() => {
      this.setState({ cards: this.state.cards.filter(card => card.id !== id) });
    });
  };
  render() {
    //console.log(this.state.inputValue);
    var closeaddButton = this.state.hideDiv ? 'none' : 'block';
    var openHideDiv = this.state.hideDiv ? 'block' : 'none';
    var allCards = this.state.cards.map(card => {
      return (
        <Card
          key={card.id}
          cards={card}
          deleteCard={this.deleteCard}
          openModal={this.props.openModal}
        />
      );
    });
    return (
      <div className='listContainer'>
        <div className='listHead'>
          <h5 className='listName'>{this.props.lists.name}</h5>
          <button
            onClick={() => this.props.deleteList(this.props.lists.id)}
            className='btn-default deleteButtonForList'>
            X
          </button>
        </div>
        <div className='cards'>{allCards}</div>
        <div>
          <button
            onClick={this.openHideDiv}
            className='addButton btn btn-success'
            style={{
              display: closeaddButton,
              backgroundColor: 'rgb(0, 0, 0, 0.2)',
              border: 'none',
              color: 'black',
              fontStyle: 'bold'
            }}>
            +Add New Card
          </button>
        </div>
        <Form
          style={{ display: openHideDiv }}
          closeInputDiv={this.closeInputDiv} //send function to from
          inputState={this.inputState}
          input={this.state.inputValue}
          addNewCard={this.addNewCard}
          buttonTitle='card'
        />
      </div>
    );
  }
}

export default List;
