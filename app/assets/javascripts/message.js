$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
      `<div class = "main-chat__message-list__box">
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
      `<div class = "main-chat__message-list__box">
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
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      let html = buildHTML(post);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('input').prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});