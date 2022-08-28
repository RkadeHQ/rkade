import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IFixture } from '../../../interfaces/fixture.interface';
import { getCreatedTeam, getFixtureByGameNumber } from '../../../services';
import {
  getISTDateFromUTC,
  getISTTimeFromUTC
} from '../../../utils/dateFormat';

const Lobby = () => {
  const Router = useRouter();
  const { query, isReady } = Router;

  const [game, setGame] = useState<IFixture>();
  const [createdTeam, setCreatedTeam] = useState<string[]>([]);

  useEffect(() => {
    if (isReady) {
      getGameInfo();
    }
  }, [isReady]);

  useEffect(() => {
    getMyTeam();
  }, [game]);

  async function getGameInfo() {
    const data = await getFixtureByGameNumber(
      parseInt(query.gameNumber as string)
    );
    setGame(data);
  }

  async function getMyTeam() {
    const data = await getCreatedTeam('myAddress', query.gameNumber as string);

    if (data) {
      setCreatedTeam(data);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primaryLight to-primaryDark px-32 py-8">
      <h1 className="text-white font-bold text-center text-4xl">Game Time</h1>
      {game && (
        <div className="mt-8">
          <div
            className="w-full flex flex-col rounded-lg pb-8"
            style={{
              background: 'rgba(0, 0, 0, 0.48)',
              borderRadius: '16px',
              backdropFilter: 'blur(6.8px)',
              boxShadow: '0px 8px 51px 0px #00000040'
            }}
          >
            <div className="w-full bg-black px-8 py-4 rounded-t-lg">
              <h6 className="text-white text-xl font-bold">
                Game {game.MatchNumber}
              </h6>
            </div>
            <div className="flex items-center justify-between px-10 py-8">
              <div className="flex flex-col items-center">
                <Image src={`/${game.HomeTeam}.png`} width={100} height={100} />
                <span className="mt-4 text-center text-white text-lg">
                  {game.HomeTeam}
                </span>
              </div>
              <div className="mx-2 text-white text-center h-full flex justify-center items-center">
                <div>
                  <div className="text-2xl font-semibold">VS</div>
                  <div className="text-md font-light">
                    {getISTDateFromUTC(game.DateUtc)}
                  </div>
                  <div className="text-md font-light">
                    {getISTTimeFromUTC(game.DateUtc)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Image src={`/${game.AwayTeam}.png`} width={100} height={100} />
                <span className="mt-4 text-center text-white text-lg">
                  {game.AwayTeam}
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-8 w-full flex flex-col rounded-lg pb-8"
            style={{
              background: 'rgba(0, 0, 0, 0.48)',
              borderRadius: '16px',
              backdropFilter: 'blur(6.8px)',
              boxShadow: '0px 8px 51px 0px #00000040'
            }}
          >
            <div className="w-full bg-black px-8 py-4 rounded-t-lg">
              <h6 className="text-white text-xl font-bold">Your Team</h6>
            </div>
            <div className="flex flex-col items-center justify-between px-10 py-8">
              {createdTeam && createdTeam.length > 0 ? (
                createdTeam.map((player) => <span>{player}</span>)
              ) : (
                <div className="flex flex-col items-center">
                  <div>You have not created a team yet.</div>
                  <button
                    onClick={() =>
                      (window.location.href = `/compete/league/${query.gameNumber}/team`)
                    }
                    className="mt-4 mx-2 bg-gradient-to-r from-primaryLight to-primaryDark py-2 px-12 rounded"
                  >
                    Create Team
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lobby;
