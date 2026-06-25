import api from './axios'

export default {
  getPosts(params) { return api().get('/posts', { params }) },
  createPost(payload) { return api().post('/posts', payload) },
  deletePost(id) { return api().delete(`/posts/${id}`) },
  getComments(postId) { return api().get(`/posts/${postId}/comments`) },
  createComment(postId, payload) { return api().post(`/posts/${postId}/comments`, payload) },
  deleteComment(postId, commentId) { return api().delete(`/posts/${postId}/comments/${commentId}`) },
}
