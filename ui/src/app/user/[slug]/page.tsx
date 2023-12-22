import { usersApi } from "@/api";
import Avatar from "@/components/Avatar";
import { getIdFromSlug, getNameFromSlug } from "@/helpers/getInfoFromSlug";
import Posts from "./Posts";
import UserStatistic from "./UserStatistic";

interface IProps {
  params: { slug: string };
}
export interface IUser {
  id?: number;
  email?: string;
  name: string;
  avatarUrl?: string;
  icon?: string;
  avatarBackground?: string;
  countSubscribers?: number;
  countSubscriptions?: number;
}

export function generateMetadata({ params: { slug } }: IProps) {
  return {
    title: getNameFromSlug(slug),
    description:
      "Join our vibrant plants community! Explore expert tips, connect with fellow enthusiasts, and cultivate your green thumb. Discover a supportive space for plant lovers to share triumphs, troubleshoot challenges, and grow together.",
  };
}

const Page = async ({ params: { slug } }: IProps) => {
  const id = getIdFromSlug(slug);
  const user = await usersApi.getOne(id);

  return (
    <div className="dc min-h-screen">
      <div className="main-card">
        <main className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar user={user} size="large" />

            <h1 className="h1 ml-2">{user?.name}</h1>
          </div>

          <UserStatistic user={user} />
        </main>
        <Posts userId={user?.id} />
      </div>
    </div>
  );
};

export default Page;
