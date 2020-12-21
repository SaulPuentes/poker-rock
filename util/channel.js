import Pusher from 'pusher-js'

const pusher = new Pusher('18af7ca777e2024297da', {
  cluster: 'mt1'
})

export const gameChannel = pusher.subscribe('poker-rock')
