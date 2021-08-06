import React from 'react';
import Modal from 'react-responsive-modal';
import CheckList from './CheckList';
import Form from './Form';


const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

class Appp extends React.Component {
  state = {
    cardId: '',
    checkLists: [],
    hideDiv: false
  };
  componentDidUpdate(prevProps) {
    if (this.props.card.id !== prevProps.card.id) {
      fetch(
        `https://api.trello.com/1/cards/${this.props.card.id}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
        {
          method: 'GET'
        }
      )
        .then(data => data.json())
        .then(data =>
          this.setState({
            checkLists: data
          })
        )
        .catch(e => console.log(e));
    }
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
  addNewCheckList = () => {
    fetch(
      `https://api.trello.com/1/cards/${this.props.card.id}/checklists?name=${this.state.inputValue}&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
      {
        method: 'POST'
      }
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          checkLists: this.state.checkLists.concat([data]),
          inputValue: ''
        });
      })
      .catch(e => console.log(e));
  };
  deleteCheckList = id => {
    fetch(
      `https://api.trello.com/1/checklists/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState({
        checkLists: this.state.checkLists.filter(
          checkList => checkList.id !== id
        )
      });
    })
    .catch(e => console.log(e));
  };

  render() {
    let closeaddButton = this.state.hideDiv ? 'none' : 'block';
    let openHideDiv = this.state.hideDiv ? 'block' : 'none';
    let checkLists = this.state.checkLists.map(checkList => (
      <CheckList
        key={checkList.id}
        checkList={checkList}
        deleteCheckList={this.deleteCheckList}
      />
    ));
    return (
      <div style={styles}>
        <Modal open={this.props.openModal} onClose={this.props.closeModal}>
          <h2>{`${this.props.card.name}`}</h2>
          <div>
            <button
              onClick={this.openHideDiv}
              style={{ display: closeaddButton }}
              className='btn btn-primary'>
              Add checkList
            </button>
            <Form
              style={{ display: openHideDiv }}
              closeInputDiv={this.closeInputDiv}
              inputState={this.inputState}
              input={this.state.inputValue}
              addNewCard={this.addNewCheckList}
              buttonTitle='check list'
            />
          </div>
          <div>{checkLists}</div>
        </Modal>
      </div>
    );
  }
}

export default Appp;
