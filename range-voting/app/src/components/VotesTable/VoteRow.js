import React, { Component } from 'react';
import { DropDown, Table, TableCell, TableHeader, TableRow, Card } from '@aragon/ui'

const scores = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

class VoteRow extends React.Component {
  handleScoreChange = () => {
    console.log('score change');

  }

  render () {
    const { name } = this.props;

    return (
      <TableRow>
        <TableCell>
          {name}
        </TableCell>
        <TableCell>
          <DropDown
            items={scores}
            onChange={this.handleScoreChange}
          />
        </TableCell>
      </TableRow>
    )
  }
}

export default VoteRow;
