import React, { Component } from 'react';
import Board from './board';
const token =
  '421401dc0406c370d37fcae4d35286fca589168586da4d3d914aa56f04324919';
const key = '0411d596f676963925b6cdc26d6adbbf';

class Boards extends Component {
  state = {
    boards: []
  };
  componentDidMount() {
    fetch(
      `https://api.trello.com/1/members/me/boards?filter=all&fields=all&lists=none&memberships=none&organization=false&organization_fields=name%2CdisplayName&key=${key}&token=${token}`,
      {
        method: 'GET'
      }
    )
      .then(data => data.json())
      .then(data => {
        // console.log(data);
        this.setState({
          boards: data
        });
      });
  }
  render() {
    var allBoards = this.state.boards.map(board => {
      return <Board key={board.id} boards={board} />;
    });
    return allBoards;
  }
}

export default Boards;
