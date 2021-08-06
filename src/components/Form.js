import React from 'react';

class Form extends React.Component {
  state = {};
  render() {
    return (
      <div className='hideDiv' style={{ display: this.props.style.display }}>
        <form onSubmit={e => e.preventDefault()}>
          <div className='hideInputDiv'>
            <input
              required
              onChange={this.props.inputState}
              className='input'
              type='text'
              value={this.props.input}
              placeholder='Enter title'
            />
          </div>
          <div className='hideButtons'>
            <button disabled={!this.props.input} onClick={this.props.addNewCard} className='hideButton'>
              {`Add ${this.props.buttonTitle}`}
            </button>
            <button onClick={this.props.closeInputDiv} className='hideButton1'>
            X
          </button>
          </div>
          </form>
      </div>
    );
  }
}

export default Form;
