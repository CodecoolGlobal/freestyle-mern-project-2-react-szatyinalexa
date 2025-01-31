import { useState, useEffect } from "react";
import UserScore from "./UserScore.jsx";
import "../scoreboard.css";

const FIRST_PLACE_MEDAL = "🥇";
const SECOND_PLACE_MEDAL = "🥈";
const THIRD_PLACE_MEDAL = "🥉";

function Scoreboard() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUsersSortedByScore() {
      const users = await (await fetch("/api/users/scored")).json();
      setUsers(users);
    }
    getUsersSortedByScore();
  }, []);

  console.log(users);

  if (!users) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="score-table-contanier">
        <h1>Scoreboard</h1>
        <table className="score-table-contanier">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserScore
                key={user["_id"]}
                rank={index + 1}
                name={user.name}
                score={user.score}
                medals={[
                  FIRST_PLACE_MEDAL,
                  SECOND_PLACE_MEDAL,
                  THIRD_PLACE_MEDAL,
                ]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Scoreboard;
