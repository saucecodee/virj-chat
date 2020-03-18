class Message {
  response(message, data, success) {
    return {
      message: message || null,
      data: data || null,
      success: success == null ? true : success,
    };
  }
}

module.exports = new Message();
