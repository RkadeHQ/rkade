import Image from 'next/image';
import { IFixture } from '../../interfaces/fixture.interface';

const GameCard = ({ game }: IGameCardProps) => {
  const { AwayTeam, DateUtc, HomeTeam, Location, MatchNumber, RoundNumber } =
    game;

  return (
    <div
      className="w-full flex flex-col rounded-lg"
      style={{
        background: 'rgba(0, 0, 0, 0.48)',
        borderRadius: '16px',
        backdropFilter: 'blur(6.8px)',
        boxShadow: '0px 8px 51px 0px #00000040'
      }}
    >
      <div className="w-full bg-black px-8 py-4 rounded-t-lg">
        <h6 className="text-white text-xl font-bold">Game {MatchNumber}</h6>
      </div>
      <div className="flex items-center justify-between px-16 py-8">
        <div className="flex flex-col items-center">
          <Image src={`/${HomeTeam}.svg`} width={138} height={138} />
          <span className="mt-4 text-center text-white text-lg">
            {HomeTeam}
          </span>
        </div>
        <span className="text-white text-2xl font-semibold">VS</span>
        <div className="flex flex-col items-center">
          <Image src={`/${AwayTeam}.svg`} width={138} height={138} />
          <span className="mt-4 text-center text-white text-lg">
            {AwayTeam}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default GameCard;

interface IGameCardProps {
  game: IFixture;
}
