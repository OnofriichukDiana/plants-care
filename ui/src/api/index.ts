import { api } from "./api";
import { crud } from "./crud";

export { authApi } from "./authApi";

export const usersApi = crud("users", {
  updatePassword: (userId: number, entity: any) =>
    api(
      `/users/${userId}/update-password`,
      {
        method: "PATCH",
        body: JSON.stringify(entity),
      },
      (response: any) => response
    ),
});

export const postsApi = crud("posts");
export const postFilesApi = crud("post-files");
export const postLikesApi = crud("post-likes", {
  isLiked: (postId: number) =>
    api(
      `/post-likes/${postId}/is-liked`,
      {
        method: "GET",
      },
      (response: boolean) => response
    ),
});
export const postCommentsApi = crud("post-comments");
export const commentFilesApi = crud("comment-files");
export const commentLikesApi = crud("comment-likes", {
  isLiked: (commentId: number) =>
    api(
      `/comment-likes/${commentId}/is-liked`,
      {
        method: "GET",
      },
      (response: boolean) => response
    ),
});

export const userToUserApi = crud("user-to-users", {
  isSubscribed: (userId: number) =>
    api(
      `/user-to-users/${userId}/is-subscribed`,
      {
        method: "GET",
      },
      (response: boolean) => response
    ),
});

export const chatsApi = crud("chat-messages", {
  countUnreadedMessages: () =>
    api(
      `/chat-messages/count-unreaded-messages`,
      {
        method: "GET",
      },
      (response: number) => response
    ),

  setViewed: (entity: any) =>
    api(
      `/chat-messages/set-viewed`,
      {
        method: "PATCH",
        body: JSON.stringify(entity),
      },
      (response: any) => response
    ),
});
