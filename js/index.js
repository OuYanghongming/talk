//验证是否有登录,Y获取登录人信息,N跳转登录页面
(async function () {
  const resp = await API.profile();
  const user = resp.data;
  if (!user) {
    alert("未登录或登录过期,请重新登录!");
    location.href = "./login.html";
    return;
  }
  //下面都是登录状态
  const doms = {
    aside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
    },
    close: $(".close"),
    chatContainer: $(".chat-container"),
    txtMsg: $("#textarea"),
    messageCont: $(".msg-container"),
  };
  setUserInfo();

  //注销事件
  doms.close.onclick = function () {
    API.loginOut();
    location.href = "./login.html";
  };

  //加载历史记录
  loadHistory();
  async function loadHistory() {
    const resp = await API.getHistory();
    console.log(resp);
    for (const item of resp.data) {
      addChat(item);
    }
    scrollBottom();
  }
  //设置用户信息
  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId;
  }

  //根据消息对象,将其添加到页面中
  function addChat(chatInfo) {
    const div = $$$("div");
    div.classList.add("chat-item");
    if (chatInfo.from) {
      div.classList.add("me");
    }
    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = chatInfo.from
      ? "https://tupian.qqw21.com/article/UploadPic/2019-6/20196122349127590.jpeg"
      : "https://www.keaitupian.cn/cjpic/frombd/2/253/1676065055/2828606542.jpg";

    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = chatInfo.content;
    //時間
    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = TimestampToDate(chatInfo.createdAt);
    //添加至div
    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);
    doms.chatContainer.appendChild(div);
  }

  //滚动条到底
  function scrollBottom() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  function TimestampToDate(Timestamp) {
    let now = new Date(Timestamp),
      y = now.getFullYear(),
      m = now.getMonth() + 1,
      d = now.getDate();
    return (
      y +
      "-" +
      (m < 10 ? "0" + m : m) +
      "-" +
      (d < 10 ? "0" + d : d) +
      " " +
      now.toTimeString().substring(0, 8)
    );
  }

  //发送消息事件
  doms.messageCont.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  };
  //聊天窗展示
  async function sendChat() {
    const txmsg = doms.txtMsg.value.trim();
    if (!txmsg) {
      return;
    }
    addChat({
      from: user.loginId,
      createdAt: Date.now(),
      to: null,
      content: txmsg,
    });
    doms.txtMsg.value = "";
    scrollBottom();
    const resp = await API.sendChat(txmsg);
    addChat({
      from: null,
      to: user.loginId,
      ...resp.data,
    });
    scrollBottom();
  }
})();
