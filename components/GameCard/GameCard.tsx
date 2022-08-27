import Image from 'next/image';
import { IFixture } from '../../interfaces/fixture.interface';
import { getISTDateFromUTC, getISTTimeFromUTC } from '../../utils/dateFormat';

const GameCard = ({ game }: IGameCardProps) => {
  const { AwayTeam, DateUtc, HomeTeam, Location, MatchNumber, RoundNumber } =
    game;

  return (
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
        <h6 className="text-white text-xl font-bold">Game {MatchNumber}</h6>
      </div>
      <div className="flex items-center justify-between px-10 py-8">
        <div className="flex flex-col items-center">
          <Image src={`/${HomeTeam}.png`} width={100} height={100} />
          <span className="mt-4 text-center text-white text-lg">
            {HomeTeam}
          </span>
        </div>
        <div className="mx-2 text-white text-center h-full flex justify-center items-center">
          <div>
            <div className="text-2xl font-semibold">VS</div>
            <div className="text-md font-light">
              {getISTDateFromUTC(DateUtc)}
            </div>
            <div className="text-md font-light">
              {getISTTimeFromUTC(DateUtc)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Image src={`/${AwayTeam}.png`} width={100} height={100} />
          <span className="mt-4 text-center text-white text-lg">
            {AwayTeam}
          </span>
        </div>
      </div>
      <div className="flex text-center justify-center items-center text-white font-semibold">
        <button className="mx-2 bg-gradient-to-r from-primaryLight to-primaryDark py-2 px-12 rounded">
          Create 1v1 Game
        </button>
        <button className="mx-2 bg-gradient-to-r from-primaryLight to-primaryDark py-2 px-12 rounded">
          Join League
        </button>
      </div>
    </div>
  );
};

export default GameCard;

interface IGameCardProps {
  game: IFixture;
}
