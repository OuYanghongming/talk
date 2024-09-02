var API = (function () {
  const BASE_RUL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";
  // 请求封装
  async function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_RUL + path, { headers });
  }

  // 获取封装
  async function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_RUL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }

  // 注册
  async function reg(userInfo) {
    return await fetch(BASE_RUL + "/api/user/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    }).then((resp) => resp.json());
  }

  // 登录
  async function login(loginInfo) {
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();
    if (result.code === 0) {
      const token = resp.headers.get("authorization");
      console.log(token);
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  // 验证
  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  // 成功用户
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  // 消息发送
  async function sendChat(content) {
    const resp = await post("/api/chat", {
      content,
    });
    return await resp.json();
  }

  // 历史消息
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
