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
    


  let reloadMessages = function() {
    let last_message_id = $('.main-chat__message-list__box:last').data("message-id");
    $.ajax({
      url: "api/messages",  //同期通信でいう『パス』
      type: 'get',  //同期通信でいう『HTTPメソッド』
      data: {id: last_message_id},  
      dataType: 'json'
    })
    .done(function(messages){
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("error");
    });
  };
  setInterval(reloadMessages, 7000);

});
