$(function(){
  function buildHTML(message){
    var imagePresent = "";
    if (message.image) {
      imagePresent = `<img class="lower-message__image" src=${message.image}>`
    }
    var html = `<div class="chat-main__bulletin-board__messages__message">
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

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__bulletin-board__messages').append(html)
      $('#new_message')[0].reset();
      console.log("森瀬隆司")
      $('.chat-main__bulletin-board').animate({scrollTop: $('.chat-main__bulletin-board')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    .always(() => {
      $(".chat-main__footer__form__submit").removeAttr("disabled");
    });
  });
});
