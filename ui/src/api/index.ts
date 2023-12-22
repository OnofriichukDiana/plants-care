import { api } from "./api";
import { crud } from "./crud";

export { authApi } from "./authApi";

export const usersApi = crud("users");

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

export const userToUserApi = crud("user-to-user", {
  isSubscribed: (userId: number) =>
    api(
      `/comment-likes/${userId}/is-subscribed`,
      {
        method: "GET",
      },
      (response: boolean) => response
    ),
});
