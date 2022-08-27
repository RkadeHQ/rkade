import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamCard1v1 from '../../components/TeamCard1v1';
import { IFixture } from '../../interfaces/fixture.interface';
import {
  getCreatedGame,
  getCreatedGameByGameCode,
  getFixtureByGameNumber,
  getJoinedGame
} from '../../services';

const Join1v1 = () => {
  const Router = useRouter();
  const { query, isReady } = Router;

  const [game, setGame] = useState<IFixture>();
  const [lockedTeam, setLockedTeam] = useState('');
  const [backedTeam, setBackedTeam] = useState('');

  useEffect(() => {
    if (isReady) {
      getGameInfo();
      getCreatedGameInfo();
      checkIfEnteredInGame();
    }
  }, [isReady]);

  async function getGameInfo() {
    const data = await getFixtureByGameNumber(
      parseInt(query.gameNumber as string)
    );
    setGame(data);
  }

  async function getCreatedGameInfo() {
    const data = await getCreatedGameByGameCode(query.gameCode as string);
    setLockedTeam(data.creatorTeam);
  }

  async function checkIfEnteredInGame() {
    const data = await getJoinedGame('myAddressOne');

    if (data[Object.keys(data)[0]]) {
      const enteredGame = data[Object.keys(data)[0]];
      setBackedTeam(enteredGame.joinerTeam);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primaryLight to-primaryDark px-32 py-8">
      <h1 className="text-white font-bold text-center text-4xl">
        Premier League - 1v1
      </h1>
      {game && (
        <div className="mt-10 flex">
          <div className="w-1/2">
            <TeamCard1v1
              teamName={game.HomeTeam}
              isHomeTeam
              isBacked={game.HomeTeam === backedTeam}
              isLocked={game.HomeTeam === lockedTeam}
              showSupportButton={!backedTeam}
              gameCode={query.gameCode as string}
              gameNumber={game.MatchNumber}
              toJoin
              noInvites
            />
          </div>
          <div className="w-1/2">
            <TeamCard1v1
              teamName={game.AwayTeam}
              isBacked={game.AwayTeam === backedTeam}
              isLocked={game.AwayTeam === lockedTeam}
              showSupportButton={!backedTeam}
              gameCode={query.gameCode as string}
              gameNumber={game.MatchNumber}
              toJoin
              noInvites
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Join1v1;
