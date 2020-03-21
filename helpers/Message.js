class Message {
  response(message, data, success) {
    return {
      message: message || null,
      data: data || null,
      success: success || false
    };
  }
}

module.exports = new Message()
