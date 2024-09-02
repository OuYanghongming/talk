//登录界面输入验证
const loginUserNameDator = new FieldValidator("loginUserName", function (val) {
  if (!val) {
    return "请输入用户名";
  }
});
const loginPwdDator = new FieldValidator("loginPwd", function (val) {
  if (!val) {
    return "请输入密码";
  }
});

const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validate(
    loginUserNameDator,
    loginPwdDator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form);
  // window.formData = formData;
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const resp = await API.login(data);
  if (resp.code === 0) {
    alert("登录成功,跳转聊天页面");
    location.href = "./index2.html";
  } else {
    alert("登录失败");
    loginPwdDator.input.value = "";
  }
};
