import type { GetAllPostsResponse } from "@/types/posts/get-all-posts.response";
import { createComment } from "@/api/comments/create-comment.api";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";

import type {
  GetCommentsResponse,
  Comment,
} from "@/types/comments/get-comments.response";

type CreateCommentVariables = {
  postId: string;
  content?: string;
  image?: File;
};

type MutationContext = {
  previousComments?: InfiniteData<GetCommentsResponse>;
  previousPosts: Array<
    [readonly unknown[], InfiniteData<GetAllPostsResponse> | undefined]
  >;
  previousUserPosts: Array<
    [readonly unknown[], InfiniteData<GetAllPostsResponse> | undefined]
  >;
  temporaryCommentId: string;
  temporaryImageUrl?: string;
};

export default function useCreateComment() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext) ?? {};

  const updatePosts = (
    key: string[],
    postId: string,
    comment: Comment,
    increaseCount = false,
  ) => {
    queryClient.setQueriesData<InfiniteData<GetAllPostsResponse>>(
      { queryKey: key },
      (oldData) =>
        oldData && {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post) =>
                post._id === postId
                  ? {
                      ...post,
                      commentsCount:
                        post.commentsCount + (increaseCount ? 1 : 0),
                      topComment: comment,
                    }
                  : post,
              ),
            },
          })),
        },
    );
  };

  return useMutation({
    mutationFn: ({ postId, content, image }: CreateCommentVariables) =>
      createComment(postId, { content, image }),

    onMutate: async (variables): Promise<MutationContext> => {
      const commentsKey = ["comments", variables.postId];

      await queryClient.cancelQueries({ queryKey: commentsKey });

      const previousComments =
        queryClient.getQueryData<InfiniteData<GetCommentsResponse>>(
          commentsKey,
        );

      const temporaryCommentId = `temp-${Date.now()}`;
      const temporaryImageUrl = variables.image
        ? URL.createObjectURL(variables.image)
        : undefined;

      const optimisticComment: Comment = {
        _id: temporaryCommentId,
        content: variables.content,
        image: temporaryImageUrl,
        commentCreator: {
          _id: user?._id ?? "optimistic",
          name: user?.name ?? "You",
          username: user?.username ?? "",
          photo: user?.photo ?? "",
        },
        post: variables.postId,
        parentComment: null,
        likes: [],
        createdAt: new Date().toISOString(),
        repliesCount: 0,
      };

      queryClient.setQueryData<InfiniteData<GetCommentsResponse>>(
        commentsKey,
        (oldData) =>
          oldData && {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    data: {
                      ...page.data,
                      comments: [optimisticComment, ...page.data.comments],
                    },
                  }
                : page,
            ),
          },
      );

      const previousPosts = queryClient.getQueriesData<
        InfiniteData<GetAllPostsResponse>
      >({ queryKey: ["posts"] });

      const previousUserPosts = queryClient.getQueriesData<
        InfiniteData<GetAllPostsResponse>
      >({ queryKey: ["user-posts"] });

      updatePosts(["posts"], variables.postId, optimisticComment, true);

      updatePosts(["user-posts"], variables.postId, optimisticComment, true);

      return {
        previousComments,
        previousPosts,
        previousUserPosts,
        temporaryCommentId,
        temporaryImageUrl,
      };
    },

    onSuccess: (response, variables, context) => {
      const realComment = response.data.comment;

      queryClient.setQueryData<InfiniteData<GetCommentsResponse>>(
        ["comments", variables.postId],
        (oldData) =>
          oldData && {
            ...oldData,
            pages: oldData.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    data: {
                      ...page.data,
                      comments: page.data.comments.map((comment) =>
                        comment._id === context.temporaryCommentId
                          ? realComment
                          : comment,
                      ),
                    },
                  }
                : page,
            ),
          },
      );

      updatePosts(["posts"], variables.postId, realComment);
      updatePosts(["user-posts"], variables.postId, realComment);

      if (context.temporaryImageUrl) {
        URL.revokeObjectURL(context.temporaryImageUrl);
      }
    },

    onError: (_error, variables, context) => {
      if (!context) return;

      if (context.previousComments) {
        queryClient.setQueryData(
          ["comments", variables.postId],
          context.previousComments,
        );
      }

      context.previousPosts.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );

      context.previousUserPosts.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );

      if (context.temporaryImageUrl) {
        URL.revokeObjectURL(context.temporaryImageUrl);
      }
    },
  });
}
