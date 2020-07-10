$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
      `<div class = "main-chat__message-list__box" data-message-id=${message.id}>
        <div class = "main-chat__message-list__box__code">
          <div class = "main-chat__message-list__box__code__user">
            ${message.user_name}
          </div>
          <div class = "main-chat__message-list__box__code__data">
            ${message.created_at}
          </div>
        </div>
        <div class = "main-chat__message-list__box__input">
          <p class = "Message__content">
            ${message.content}
          </p>
            <img class = "Message__image" src= "${message.image}">
        </div>
      </div>`
      return html;
    } else {
      let html =
      `<div class = "main-chat__message-list__box" data-message-id=${message.id}>
        <div class = "main-chat__message-list__box__code">
          <div class = "main-chat__message-list__box__code__user">
            ${message.user_name}
          </div>
          <div class = "main-chat__message-list__box__code__data">
            ${message.created_at}
          </div>
        </div>
        <div class = "main-chat__message-list__box__input">
          <p class = "Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
    


  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);      
      $('form')[0].reset();
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('.Form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
    return false;
  });
});