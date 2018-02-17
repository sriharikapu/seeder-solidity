import React, { Component } from 'react';
import { Dropdown, Table, TableCell, TableHeader, TableRow, Card } from '@aragon/ui'
import VoteRow from './VoteRow';

const VotesTable = ({
  candidates,
  onSelectVote
}) => (
  <Table
    header={
      <TableRow>
        <TableHeader title='Charity Name'>
        <TableHeader title="Score" />
        </TableHeader>
      </TableRow>
    }
  >
  {candidates.map(
    ({
      id,
      name
    }) => (
      <VoteRow
        id={id}
        name={name}
      />
    )
  )}
  </Table>
)

export default VotesTable;
