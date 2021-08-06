import React, { Component } from 'react';
import Form from './Form';
import CheckItem from './CheckItem';



class CheckList extends Component {
  state = {
    checkItems: []
  };
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
      {
        method: 'GET'
      }
    )
      .then(data => data.json())
      .then(data =>
        this.setState({
          checkItems: data
        })
      )
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
  addNewCheckItem = () => {
    fetch(
      `https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems?name=${this.state.inputValue}&pos=bottom&checked=false&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
      {
        method: 'POST'
      }
    )
      .then(data => data.json())
      .then(data =>
        this.setState({
          checkItems: this.state.checkItems.concat([data]),
          inputValue: ''
        })
      )
      .catch(e => console.log(e));
  };
  deleteCheckItem = id => {
    fetch(
      `https://api.trello.com/1/checklists/${this.props.checkList.id}/checkItems/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState({
        checkItems: this.state.checkItems.filter(
          CheckItem => CheckItem.id !== id
        )
      });
    })
    .catch(e => console.log(e));
  };
  updateCheckItem = (event, checkItem) => {
    let checkItemStatus = event.target.checked ? 'complete' : 'incomplete';
    fetch(
      `https://api.trello.com/1/cards/${this.props.checkList.idCard}/checkItem/${checkItem.id}?state=${checkItemStatus}&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
      {
        method: 'PUT'
      }
    )
      .then(data => data.json())
      .then(data => {
        let allItem = this.state.checkItems;
        allItem[allItem.indexOf(checkItem)].state = data.state;
        this.setState({
          checkItems: allItem
        });
      })
      .catch(e => console.log(e));
  };
  render() {
    let closeaddButton = this.state.hideDiv ? 'none' : 'block';
    let openHideDiv = this.state.hideDiv ? 'block' : 'none';
    let checkItems = this.state.checkItems.map(checkItem => (
      <CheckItem
        key={checkItem.id}
        checkItem={checkItem}
        deleteCheckItem={this.deleteCheckItem}
        updateCheckItem={this.updateCheckItem}
      />
    ));
    return (
      <div className='checkListContainer'>
        <h3>{this.props.checkList.name}</h3>
        <div className='itemsContainer'>{checkItems}</div>
        <div className='buttonsOfCheckList'>
          <div>
            <button
              onClick={() =>
                this.props.deleteCheckList(this.props.checkList.id)
              }
              className='deleteButtonForCheckList btn btn-danger btn-xsm'>
              Delete
            </button>
          </div>
          <div>
            <button
              onClick={this.openHideDiv}
              style={{ display: closeaddButton }}
              className='addButtonForCheckItem btn btn-primary btn-xsm'>
              add items
            </button>
            <Form
              style={{ display: openHideDiv }}
              closeInputDiv={this.closeInputDiv}
              inputState={this.inputState}
              input={this.state.inputValue}
              addNewCard={this.addNewCheckItem}
              buttonTitle='check item'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CheckList;
