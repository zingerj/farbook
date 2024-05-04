import { type FollowResponseUser } from "@neynar/nodejs-sdk/build/neynar-api/v1";
import { neynar } from "~/lib/neynar";

const FID = 1407;

export const dynamic = "force-dynamic";

async function getFriends() {
  let following: FollowResponseUser[] = [];
  let cursor = "";

  do {
    const page = await neynar.fetchUserFollowing(FID, {
      viewerFid: FID,
      limit: 150,
      cursor,
    });

    following = following.concat(page.result.users);
    cursor = page.result.next.cursor ?? "";
  } while (!!cursor);

  const friends = following
    .filter((user) => user.viewerContext?.followedBy)
    .map((friend) => friend.fid);

  console.log(`Found ${friends.length} friends`);
  return friends;
}

export default async function Feed() {
  const friends = await getFriends();
  const feed = await neynar.fetchFeed("filter", {
    filterType: "fids",
    fids: friends,
  });

  console.log(feed);

  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
}
