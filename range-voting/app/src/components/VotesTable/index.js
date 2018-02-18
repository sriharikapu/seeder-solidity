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
        <TableHeader title="Votes" />
        <TableHeader title="Avg Score" />
      </TableRow>
    }
  >
  {candidates.map(
    ({
      id,
      address,
      name,
      voteCount,
      avgScore,
      participantScore,
      hasVoted
    }) => (
      <VoteRow
        hasVoted={hasVoted}
        id={id}
        key={id}
        address={address}
        voteCount={voteCount}
        avgScore={avgScore}
        name={name}
        score={participantScore}
        onSelectVote={onSelectVote}
        onRemoveVote={onRemoveVote}
      />
    )
  )}
  </Table>
)

export default VotesTable;
