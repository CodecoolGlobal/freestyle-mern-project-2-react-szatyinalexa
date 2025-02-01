function UserScore({ rank, name, score, medals }) {
  return (
    <tr>
      <td>{`${rank}. `}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>
        {(rank === 1 && medals[0]) ||
          (rank === 2 && medals[1]) ||
          (rank === 3 && medals[2])}
      </td>
    </tr>
  );
}

export default UserScore;
