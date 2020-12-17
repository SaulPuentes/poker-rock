import Pusher from 'pusher-js'

const pusher = new Pusher('18af7ca777e2024297da', {
  cluster: 'mt1',
  authEndpoint: '/api/auth/pusher',
})

const publicPusher = new Pusher('18af7ca777e2024297da', {
  cluster: 'mt1'
})

export const gameChannel = publicPusher.subscribe('poker-rock')

export const presenceChannel = pusher.subscribe('presence-poker-rock')
