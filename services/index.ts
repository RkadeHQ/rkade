import { IFixture } from '../interfaces/fixture.interface';
import router from '../utils/router';

export async function getFixtures(): Promise<IFixture[]> {
  const todaysDateInISO = new Date().toISOString();

  const fixturesData = await router.get(`/premier-league/fixtures.json`);
  const fixtures: IFixture[] = fixturesData.data;

  return fixtures
    .filter((game) => new Date(game.DateUtc) > new Date())
    .slice(0, 6);
}
