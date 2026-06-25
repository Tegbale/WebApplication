import { defineStore } from 'pinia'
import postsApi from '@/api/posts'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    meta: { total: 0, page: 1, totalPages: 1 },
    loading: false,
  }),

  actions: {
    async fetchAll(params = {}) {
      this.loading = true
      try {
        const { data } = await postsApi.getPosts({ page: 1, limit: 20, ...params })
        this.posts = data.data
        this.meta = { total: data.meta?.total ?? 0, page: data.meta?.page ?? 1, totalPages: data.meta?.totalPages ?? 1 }
      } finally {
        this.loading = false
      }
    },

    async create(content) {
      const { data } = await postsApi.createPost({ content })
      this.posts.unshift(data.data)
      this.meta.total++
    },

    async remove(id) {
      await postsApi.deletePost(id)
      this.posts = this.posts.filter((p) => p.id !== id)
      this.meta.total--
    },

    async loadComments(postId) {
      const post = this.posts.find((p) => p.id === postId)
      if (!post) return
      const { data } = await postsApi.getComments(postId)
      post.comments = data.data
    },

    async addComment(postId, content, parentCommentId = null) {
      const payload = { content }
      if (parentCommentId) payload.parentCommentId = parentCommentId
      const { data } = await postsApi.createComment(postId, payload)
      const post = this.posts.find((p) => p.id === postId)
      if (!post) return data.data
      if (!post.comments) post.comments = []
      if (parentCommentId) {
        const parent = findComment(post.comments, parentCommentId)
        if (parent) {
          if (!parent.replies) parent.replies = []
          parent.replies.push(data.data)
        }
      } else {
        post.comments.push(data.data)
      }
      post._count.comments++
      return data.data
    },

    async removeComment(postId, commentId) {
      await postsApi.deleteComment(postId, commentId)
      const post = this.posts.find((p) => p.id === postId)
      if (!post || !post.comments) return
      post.comments = post.comments.filter((c) => c.id !== commentId)
      post._count.comments--
    },
  },
})

function findComment(comments, id) {
  for (const c of comments) {
    if (c.id === id) return c
    if (c.replies) {
      const found = findComment(c.replies, id)
      if (found) return found
    }
  }
  return null
}
