const socket = io('https://virj-chat.herokuapp.com/')
// const socket = io('localhost:3030')

const messageForm = $('.message-form')
messageForm.addEventListener('submit', sendMessage)


socket.on('new-message', data => {
  const { user, message, sentAt, userId } = data
  appendMessage(user, message, sentAt, userId)
})

socket.on('movement', data => {
  const { user, event } = data
  appendAlert(user, event)
})

socket.on('user-disconnected', data => {
  const { user, event } = data
  appendAlert(user, event)
})

function joinVillage() {
  appendAlert(app.data.userName, 'welcome')
  const data = {
    groupId: app.data.groupId,
    userId: app.data.userId,
    username: app.data.userName
  }
  socket.emit('join-village', data)
}

function leaveVillage() {
  const data = {
    groupId: app.data.groupId,
    userId: app.data.userId
  }
  socket.emit('leave-village', data)
  window.location.href = 'exit.html';
}

function sendMessage(e) {
  e.preventDefault();
  if (messageInput.value.length !== 0) {
    appendMessage(app.data.userName, messageInput.value, new Date(), app.data.userId)

    const data = {
      groupId: app.data.groupId,
      userId: app.data.userId,
      message: messageInput.value,
      date: new Date()
    }
    socket.emit('send-message', data)

    messageInput.value = ''
  }
}

joinVillage()

console.log(app)