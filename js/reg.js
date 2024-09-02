// 账号检测
const txtLoginIddator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空";
  }
  const resp = await API.exists(val);
  if (resp.data) {
    return "账号已存在,请重新输入";
  } else {
    return "";
  }
});
//昵称验证
const nicknameValidator = new FieldValidator("txtNickname", function (val) {
  if (!val) {
    return "请填写昵称";
  }
});
const loginPwdValidator = new FieldValidator("txtLoginPwd", function (val) {
  if (!val) {
    return "请填写密码";
  }
});
const loginPwdConfirmValidator = new FieldValidator(
  "txtLoginPwdConfirm",
  function (val) {
    if (!val) {
      return "请再输入一次密码";
    }
    if (val !== loginPwdValidator.input.value) {
      return "两次密码不一致,请重新填写";
    }
  }
);
const form = $(".user-form");
console.log("打印表单数据", form);
form.onsubmit = async function (e) {
  e.preventDefault();
  // console.log("表单正在提交");
  const result = await FieldValidator.validate(
    txtLoginIddator,
    nicknameValidator,
    loginPwdValidator,
    loginPwdConfirmValidator
  );
  if (!result) {
    return;
  }
  const formData = new FormData(form);
  // window.formData = formData;
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const resp = await API.reg(data);
  if (resp.code === 0) {
    alert("注册成功,跳转登录页面");
    location.href = "./login.html";
  } else {
    alert("注册失败");
  }
};
