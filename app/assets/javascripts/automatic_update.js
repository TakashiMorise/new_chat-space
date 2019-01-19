$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var imagePresent = "";
    if (message.image) {
      imagePresent = `<img class="lower-message__image" src=${message.image}>`
    }
    var html = `<div class="chat-main__bulletin-board__messages__message" data-message-id="${message.message_id}">
                  <div class="chat-main__bulletin-board__messages__message-name">
                    ${message.name}
                  </div>
                  <div class="chat-main__bulletin-board__messages__message-date">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__bulletin-board__messages__message-text">
                    ${message.content}
                    ${imagePresent}
                  </div>
                </div>`
    return html;
  }
  function auto_update() {
    if ($('.chat-main__bulletin-board__messages__message')[0]){
      var last_message_id = $('.chat-main__bulletin-board__messages__message:last').data('message-id');
    } else {
      var last_message_id = 0;
    }
    $.ajax({
      url: window.location.pathname,
      type: 'GET',
      data: { id: last_message_id },
      dataType: 'json'
    })
    .done(function(newMessages) {
      newMessages.forEach(function(newMessage){
        var html = buildHTML(newMessage);
        $('.chat-main__bulletin-board__messages').append(html);
        $('.chat-main__bulletin-board').animate({scrollTop: $('.chat-main__bulletin-board')[0].scrollHeight}, 'fast');
      });
    });
  }
  if (location.pathname.match(/\/groups\/\d+\/messages/)){
    setInterval(auto_update, 5000);
  }
});
