import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IFixture } from '../../../interfaces/fixture.interface';
import { IPlayer } from '../../../interfaces/player.interface';
import {
  createTeamForLeague,
  getFixtureByGameNumber,
  getPlayersByTeams
} from '../../../services';

const CreateTeam = () => {
  const Router = useRouter();
  const { query, isReady } = Router;

  const [game, setGame] = useState<IFixture>();
  const [homePlayers, setHomePlayers] = useState<IPlayer[]>([]);
  const [awayPlayers, setAwayPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    if (isReady) {
      getGameInfo();
    }
  }, [isReady]);

  useEffect(() => {
    if (game) {
      getPlayersFromMatch();
    }
  }, [game]);

  async function getGameInfo() {
    const data = await getFixtureByGameNumber(
      parseInt(query.gameNumber as string)
    );
    setGame(data);
    getPlayersFromMatch();
  }

  async function getPlayersFromMatch() {
    if (game) {
      const data = await getPlayersByTeams(game.HomeTeam, game.AwayTeam);
      setHomePlayers(data.filter((player) => player.team === game.HomeTeam));
      setAwayPlayers(data.filter((player) => player.team === game.AwayTeam));
    }
  }

  async function onSubmitTeamHandler() {
    const res = await createTeamForLeague(
      query.gameNumber as string,
      'myAddress',
      ['C Ronaldo', 'C Ronaldo', 'C Ronaldo']
    );
    window.location.href = `/compete/league/${query.gameNumber}`;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primaryLight to-primaryDark px-32 py-8">
      <h1 className="text-white font-bold text-center text-4xl">
        Create your Team
      </h1>
      {game && (
        <>
          <div className="flex mt-8">
            <div className="w-1/2 px-10 flex flex-col">
              <div
                className="flex w-full items-center justify-center px-24 py-6"
                style={{
                  background: 'rgba(0, 0, 0, 0.48)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(6.8px)',
                  boxShadow: '0px 8px 51px 0px #00000040'
                }}
              >
                <Image src={`/${game.HomeTeam}.png`} width={100} height={100} />
                <div className="ml-8 text-3xl text-white font-semibold">
                  {game.HomeTeam}
                </div>
              </div>
              <div
                className="flex flex-col w-full mt-8 px-24 py-6"
                style={{
                  background: 'rgba(0, 0, 0, 0.48)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(6.8px)',
                  boxShadow: '0px 8px 51px 0px #00000040'
                }}
              >
                {homePlayers.map((hp) => (
                  <div>{hp.name}</div>
                ))}
              </div>
            </div>
            <div className="w-1/2 px-10 flex flex-col">
              <div
                className="flex w-full items-center justify-center px-24 py-6"
                style={{
                  background: 'rgba(0, 0, 0, 0.48)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(6.8px)',
                  boxShadow: '0px 8px 51px 0px #00000040'
                }}
              >
                <Image src={`/${game.AwayTeam}.png`} width={100} height={100} />
                <div className="ml-8 text-3xl text-white font-semibold">
                  {game.AwayTeam}
                </div>
              </div>
              <div
                className="flex flex-col w-full mt-8 px-24 py-6"
                style={{
                  background: 'rgba(0, 0, 0, 0.48)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(6.8px)',
                  boxShadow: '0px 8px 51px 0px #00000040'
                }}
              >
                {awayPlayers.map((ap) => (
                  <div>{ap.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 w-full flex items-center justify-between rounded bg-black py-10 px-12">
            <div className="text-white text-xl font-semibold">
              Players selected: 5/5
            </div>
            <button
              className="mx-2 bg-gradient-to-r from-primaryLight to-primaryDark py-2 px-12 rounded text-white"
              onClick={onSubmitTeamHandler}
            >
              I'm all set
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTeam;
