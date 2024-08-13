import type { MappedRoutes } from './backendTypes'

export const tripApiRoutes = {
  'delete/trip/:id': ({ id }) => `/trip/${id}`,
  'get/trip/:id': ({ id }) => `/trip/${id}`,
  'post/trip/:id/leave': ({ id }) => `/trip/${id}/leave`,
  'post/trip/:id/join': ({ id }) => `/trip/${id}/join`,
  'post/trip/:id/join/:requestId/accept': ({ id, requestId }) =>
    `/trip/${id}/join/${requestId}/accept`,
  'get/trip/overview': () => `/trip/overview`,
} satisfies MappedRoutes

export const communityApiRoutes = {
  'get/community/:id': ({ id }) => `/community/${id}`,
  'post/community/:id/join': ({ id }) => `/community/${id}/join`,
  'post/community/:id/leave': ({ id }) => `/community/${id}/leave`,
  'delete/community/:id': ({ id }) => `/community/${id}`,
  'post/community/:id/invite': ({ id }) => `/community/${id}/invite`,
  'get/community/index': () => `/community`,
  'post/community/index': () => `/community`,
  'get/community/overview': () => `/community/overview`,
} satisfies MappedRoutes
