import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TeamCard1v1 from '../../components/TeamCard1v1';
import { IFixture } from '../../interfaces/fixture.interface';
import { getCreatedGame, getFixtureByGameNumber } from '../../services';

const Create1v1 = () => {
  const Router = useRouter();
  const { query, isReady } = Router;

  const [game, setGame] = useState<IFixture>();
  const [backedTeam, setBackedTeam] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [lockedTeam, setLockedTeam] = useState('');

  useEffect(() => {
    if (isReady) {
      getGameInfo();
      checkIfEnteredInGame();
    }
  }, [isReady]);

  async function getGameInfo() {
    const data = await getFixtureByGameNumber(
      parseInt(query.gameNumber as string)
    );
    setGame(data);
  }

  async function checkIfEnteredInGame() {
    const data = await getCreatedGame('myAddress');

    if (data[Object.keys(data)[0]]) {
      const enteredGame = data[Object.keys(data)[0]];
      setBackedTeam(enteredGame.creatorTeam);
      setGameCode(Object.keys(data)[0]);
      setLockedTeam(enteredGame.joinerTeam);
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
              showSupportButton={!backedTeam}
              gameCode={gameCode}
              gameNumber={game.MatchNumber}
              isLocked={game.HomeTeam === lockedTeam}
            />
          </div>
          <div className="w-1/2">
            <TeamCard1v1
              teamName={game.AwayTeam}
              isBacked={game.AwayTeam === backedTeam}
              showSupportButton={!backedTeam}
              gameCode={gameCode}
              gameNumber={game.MatchNumber}
              isLocked={game.AwayTeam === lockedTeam}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Create1v1;
