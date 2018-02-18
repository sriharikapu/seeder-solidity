import React from 'react';
import { Button, DropDown, TableCell, TableRow, Text } from '@aragon/ui'

const scores = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

class VoteRow extends React.Component {
  constructor(props) {
    super(props);
    const { score } = this.props;
    debugger;
    this.state = {
      score
    };
  }

  handleScoreChange = (score) => {
    this.setState({
      score
    });
  }

  handleVote = () => {
    const { id, onSelectVote } = this.props;
    onSelectVote({ id, score: this.state.score })
  }

  handleRemoveVote = () => {
    const { id, onRemoveVote } = this.props;
    onRemoveVote({ id })
  }

  render () {
    const {
      name,
      score,
      voteCount,
      avgScore,
      hasVoted
    } = this.props;

    return (
      <TableRow>
        <TableCell>
          {name}
        </TableCell>
        <TableCell>
          {hasVoted ?
            <Text>{score}</Text>
            :
            <DropDown
              active={this.state.score}
              items={scores}
              onChange={this.handleScoreChange}
            />
          }
        </TableCell>
        <TableCell>
          {voteCount}
        </TableCell>
        <TableCell>
          {avgScore}
        </TableCell>
        <TableCell>
          {hasVoted ?
            <Button emphasis='negative' mode="strong" onClick={this.handleRemoveVote}>Remove Vote</Button>
            :
            <Button emphasis='positive' mode="strong" onClick={this.handleVote}>Vote</Button>
          }
        </TableCell>
      </TableRow>
    )
  }
}

export default VoteRow;
