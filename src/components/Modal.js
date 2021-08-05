import React from 'react';
import Modal from 'react-responsive-modal'; //install lib for modal pop up
import CheckList from './CheckList';
import Form from './Form';
const token =
  '421401dc0406c370d37fcae4d35286fca589168586da4d3d914aa56f04324919';
const key = '0411d596f676963925b6cdc26d6adbbf';

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
        `https://api.trello.com/1/cards/${this.props.card.id}/checklists?checkItems=all&checkItem_fields=name%2CnameData%2Cpos%2Cstate&filter=all&fields=all&key=${key}&token=${token}`,
        {
          method: 'GET'
        }
      )
        .then(data => data.json())
        .then(data =>
          this.setState({
            checkLists: data
          })
        );
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
      `https://api.trello.com/1/cards/${this.props.card.id}/checklists?name=${this.state.inputValue}&key=${key}&token=${token}`,
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
      });
  };
  deleteCheckList = id => {
    fetch(
      `https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`,
      {
        method: 'DELETE'
      }
    ).then(() => {
      this.setState({
        checkLists: this.state.checkLists.filter(
          checkList => checkList.id !== id
        )
      });
    });
  };

  render() {
    //console.log(this.props, 'hello');
    // const { open } = this.state;
    var closeaddButton = this.state.hideDiv ? 'none' : 'block';
    var openHideDiv = this.state.hideDiv ? 'block' : 'none';
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
