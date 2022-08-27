import { useEffect, useState } from 'react';
import GameCard from '../../components/GameCard';
import { IFixture } from '../../interfaces/fixture.interface';
import { getFixtures } from '../../services';

const ExplorePremierLeague = () => {
  const [games, setGames] = useState<IFixture[]>([]);

  useEffect(() => {
    getGames();
  }, []);

  async function getGames() {
    const fixtures = await getFixtures();
    setGames(fixtures);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-primaryLight to-primaryDark px-32 py-8">
      <h1 className="text-white font-bold text-center text-4xl">
        Premier League
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-5">
        {games.map((game) => (
          <GameCard key={game.MatchNumber} game={game} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePremierLeague;
