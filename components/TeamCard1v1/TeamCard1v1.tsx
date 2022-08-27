import Image from 'next/image';
import { createGame, joinGame } from '../../services';

const TeamCard1v1 = ({
  isHomeTeam,
  teamName,
  isBacked,
  showSupportButton,
  gameCode,
  gameNumber,
  isLocked,
  lockedByAddress,
  toJoin,
  noInvites
}: ITeamCard1v1Props) => {
  async function supportButtonClickedHandler() {
    if (toJoin) {
      const data = await joinGame('myAddressOne', teamName, gameCode as string);
      console.log(data);
      window.location.reload();
    } else {
      const data = await createGame('myAddress', teamName);
      console.log(data);
      window.location.reload();
    }
  }

  if (isLocked) {
    return (
      <div
        className="flex h-full flex-col justify-between rounded-lg mx-auto"
        style={{
          width: '472px',
          background: 'rgba(0, 0, 0, 0.78)',
          borderRadius: '16px',
          backdropFilter: 'blur(6.8px)',
          boxShadow: '0px 8px 51px 0px #00000040'
        }}
      >
        <div className="w-full bg-black px-8 py-4 rounded-t-lg">
          <h6 className="text-white text-center text-xl font-bold">
            {isHomeTeam ? 'Home' : 'Away'} Team
          </h6>
        </div>
        <div className="flex flex-col items-center justify-between h-full px-10 py-8">
          <Image src={`/check-icon.svg`} width={180} height={180} />
          <span className="mt-8 text-center text-white text-lg">
            {teamName} has been backed by {lockedByAddress} for this game
          </span>
        </div>
      </div>
    );
  }

  if (isBacked) {
    return (
      <div
        className="flex h-full flex-col justify-between rounded-lg mx-auto"
        style={{
          width: '472px',
          background: 'rgba(0, 0, 0, 0.78)',
          borderRadius: '16px',
          backdropFilter: 'blur(6.8px)',
          boxShadow: '0px 8px 51px 0px #00000040'
        }}
      >
        <div className="w-full bg-black px-8 py-4 rounded-t-lg">
          <h6 className="text-white text-center text-xl font-bold">
            {isHomeTeam ? 'Home' : 'Away'} Team
          </h6>
        </div>
        <div className="flex flex-col items-center justify-between h-full px-10 py-8">
          <Image src={`/check-icon.svg`} width={180} height={180} />
          <span className="mt-8 text-center text-white text-lg">
            You have successfully backed {teamName} for this game
          </span>
          {!noInvites && (
            <>
              <div className="mt-8 text-center text-white text-xl font-semibold">
                Invite a friend to play with you
              </div>
              <div className="mt-4 w-full flex justify-between items-center border-2 border-gray-dark py-2 px-4 rounded">
                <span className="text-white text-xs border-r-white border-r-2 pr-4">
                  COPY
                </span>
                <div className="pl-4 flex-1 text-white text-xs">
                  http://localhost:3000/compete/1v1/{gameNumber}/join/{gameCode}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col rounded-lg pb-8 mx-auto"
      style={{
        width: '472px',
        background: 'rgba(0, 0, 0, 0.48)',
        borderRadius: '16px',
        backdropFilter: 'blur(6.8px)',
        boxShadow: '0px 8px 51px 0px #00000040'
      }}
    >
      <div className="w-full bg-black px-8 py-4 rounded-t-lg">
        <h6 className="text-white text-center text-xl font-bold">
          {isHomeTeam ? 'Home' : 'Away'} Team
        </h6>
      </div>
      <div className="flex flex-col items-center justify-between px-10 py-8">
        <Image src={`/${teamName}.png`} width={180} height={180} />
        <span className="mt-8 text-center text-white text-3xl font-semibold">
          {teamName}
        </span>
      </div>
      <div className="text-center text-white font-semibold">
        {showSupportButton ? (
          <button
            className="bg-gradient-to-r from-primaryLight to-primaryDark py-2 px-32 rounded"
            onClick={supportButtonClickedHandler}
          >
            Support
          </button>
        ) : (
          <button className="bg-gray-mute text-gray-dark cursor-not-allowed py-2 px-32 rounded">
            Support
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamCard1v1;

interface ITeamCard1v1Props {
  isBacked?: boolean;
  isLocked?: boolean;
  lockedByAddress?: string;
  gameCode?: string;
  isHomeTeam?: boolean;
  teamName: string;
  gameNumber: number;
  showSupportButton: boolean;
  toJoin?: boolean;
  noInvites?: boolean;
}
