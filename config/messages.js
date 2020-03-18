class Message{
     response(status, message, result, error){
          return{
               status: status || null,
               message: message || null,
               result:  result || null,
               error: error || true
          }
     }
}

module.exports = new Message()