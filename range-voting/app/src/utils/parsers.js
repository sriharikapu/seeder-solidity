const epochToDate = seconds => {
  return new Date(seconds * 1000);
};

const dehex = (hex) => {
  const hexMeat = hex.substr(2);
  const buffer = Buffer.from(hexMeat, 'hex');
  return buffer.toString();
};

const safeDivide = (numerator, denominator) => {
  if (denominator === 0 || isNaN(denominator)) {
    return 'N/A';
  }
  else {
    return numerator / denominator;
  }

}

/**
 * [
 *   [name1, name2, ...]
 *   [addy1, addy2, ...]
 *   [scoreTotal1, scoreTotal2, ...]
 *   [votes1, votes2, ...]
 * ]
 */
const mapCandidates = (candidates, userVotes) => {
  const names = candidates[0];
  const addresses = candidates[1];
  const scoreTotals = candidates[2];
  const voteCounts = candidates[3];

  const mappedCandidates = [];

  for (let x = 0; x < candidates[0].length; x++) {
    const avgScore = safeDivide(Number(scoreTotals[x]), Number(voteCounts[x]));

    mappedCandidates.push({
      id: x,
      name: dehex(names[x]),
      address: addresses[x],
      avgScore,
      voteCount: Number(voteCounts[x]),
      hasVoted: Number(userVotes[x]) !== 0,
      participantScore: Number(userVotes[x])
    });
  }

  return mappedCandidates;
}




export {
  dehex,
  mapCandidates,
  epochToDate
}
