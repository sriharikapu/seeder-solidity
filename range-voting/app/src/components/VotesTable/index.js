import React from 'react';
import { Table, TableHeader, TableRow } from '@aragon/ui'
import VoteRow from './VoteRow';

const VotesTable = ({
  candidates,
  onSelectVote,
  onRemoveVote
}) => (
  <Table
    header={
      <TableRow>
        <TableHeader title='Charity Name' />
        <TableHeader title="Score" />
      </TableRow>
    }
  >
  {candidates.map(
    ({
      id,
      name,
      score,
      hasVoted
    }) => (
      <VoteRow
        hasVoted={hasVoted}
        key={id}
        id={id}
        name={name}
        score={score}
        onSelectVote={onSelectVote}
        onRemoveVote={onRemoveVote}
      />
    )
  )}
  </Table>
)

export default VotesTable;
