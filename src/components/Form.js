import React from 'react';

class Form extends React.Component {
  state = {};
  render() {
    return (
      <div className='hideDiv' style={{ display: this.props.style.display }}>
        <div className='hideInputDiv'>
          <input
            onChange={this.props.inputState}
            className='input'
            required
            type='text'
            value={this.props.input}
            placeholder='Enter title'
          />
        </div>
        <div className='hideButtons'>
          <button onClick={this.props.addNewCard} className='hideButton'>
            {`Add ${this.props.buttonTitle}`}
          </button>
          <button onClick={this.props.closeInputDiv} className='hideButton1'>
            X
          </button>
        </div>
      </div>
    );
  }
}

export default Form;
