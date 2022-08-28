import { IFixture } from '../interfaces/fixture.interface';
import { IGame } from '../interfaces/game.interface';
import { IPlayer } from '../interfaces/player.interface';
import router from '../utils/router';

export async function getFixtures(): Promise<IFixture[]> {
  const res = await router.get(`/premier-league/fixtures.json`);
  const fixtures: IFixture[] = res.data;

  return fixtures
    .filter((game) => new Date(game.DateUtc) > new Date())
    .slice(0, 6);
}

export async function createGame(address: string, teamName: string) {
  const body = {
    creatorAddress: address,
    creatorTeam: teamName
  };

  const res = await router.post(`/premier-league/1v1.json`, body);

  return res.data;
}

export async function getCreatedGame(address: string): Promise<EnteredGame> {
  const { data } = await router.get(
    `/premier-league/1v1.json?orderBy="creatorAddress"&startAt="${address}"&endAt="${address}"`
  );

  return data;
}

export async function getJoinedGame(address: string): Promise<EnteredGame> {
  const { data } = await router.get(
    `/premier-league/1v1.json?orderBy="joinerAddress"&startAt="${address}"&endAt="${address}"`
  );

  return data;
}

type EnteredGame = {
  [gameCode: string]: IGame;
};

export async function getCreatedGameByGameCode(
  gameCode: string
): Promise<IGame> {
  const { data } = await router.get(`/premier-league/1v1/${gameCode}.json`);

  return data;
}

export async function joinGame(
  address: string,
  teamName: string,
  gameCode: string
) {
  const { data: fetchedGame } = await router.get(
    `/premier-league/1v1/${gameCode}.json`
  );

  const body = {
    joinerAddress: address,
    joinerTeam: teamName
  };

  const res = await router.patch(`/premier-league/1v1/${gameCode}.json`, body);

  return res.data;
}

export async function getFixtureByGameNumber(
  gameNumber: number
): Promise<IFixture> {
  const res = await router.get(`/premier-league/fixtures.json`);
  const fixtures: IFixture[] = res.data;

  return fixtures.find((game) => game.MatchNumber === gameNumber) as IFixture;
}

export async function getPlayersByTeams(homeTeam: string, awayTeam: string) {
  const res = await router.get(`/premier-league/players.json`);
  const players: IPlayer[] = res.data;

  return players.filter(
    (player) => player.team === homeTeam || player.team === awayTeam
  );
}

export async function createTeamForLeague(
  gameCode: string,
  address: string,
  players: string[]
) {
  const body = {
    [`${address}`]: players
  };

  const res = router.put(`/premier-league/leagues/${gameCode}.json`, body);

  return (await res).data;
}
