import React, { Component } from 'react';
import Card from './Card';
import Form from './Form';


class List extends Component {
  state = {
    cards: [],
    hideDiv: false,
    inputValue: ''
  };
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/lists/${this.props.lists.id}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          cards: data
        });
      })
      .catch(e => console.log(e));
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

    await fetch(
      `https://api.trello.com/1/cards?idList=${this.props.lists.id}&name=${this.state.inputValue}&keepFromSource=all&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
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
      })
      .catch(e => console.log(e));
  };

  deleteCard = (event, id) => {
    event.stopPropagation();
    fetch(`https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`, {
      method: 'DELETE'
    }).then(() => {
      this.setState({ cards: this.state.cards.filter(card => card.id !== id) });
    })
    .catch(e => console.log(e));
  };
  render() {
    let closeaddButton = this.state.hideDiv ? 'none' : 'block';
    let openHideDiv = this.state.hideDiv ? 'block' : 'none';
    let allCards = this.state.cards.map(card => {
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
