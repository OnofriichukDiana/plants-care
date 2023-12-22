"use client";
import Actions from "./Actions";
import { IUser } from "./page";

interface IProps {
  user: IUser;
}

const UserStatistic = async ({ user }: IProps) => {
  return (
    <div className="flex w-1/2">
      <div className="mr-2 md:mr-10">
        <p className="h1 text-center">{user?.countSubscribers}</p>
        <button type="button" className="icon-button">
          Subscribers
        </button>
      </div>

      <div>
        <p className="h1 text-center">{user?.countSubscriptions}</p>
        <button type="button" className="icon-button">
          Subscriptions
        </button>
      </div>
      <Actions userId={user?.id} afterSave={() => {}} />
    </div>
  );
};

export default UserStatistic;
