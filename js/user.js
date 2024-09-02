/**
 * 用户登录,注册表单的验证
 */
class FieldValidator {
  /**
   *
   * @param {String} txtId 文本框Id
   * @param {Function} validatorFunc 验证规则
   * 当需要对文本框进行验证时,会调用该函数,函数的参数为当前文本框的值,函数的返回值为验证的错误消息,若无返回,则表示无错误.
   */
  constructor(txtId, validatorFunc) {
    this.input = $("#" + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc;
    this.input.onmouseleave = () => {
      this.validate();
    };
  }
  async validate() {
    // console.log("验证");
    const err = await this.validatorFunc(this.input.value);
    if (err) {
      this.p.innerHTML = err;
      return false;
    } else {
      this.p.innerHTML = "";
      return true;
    }
  }

  static async validate(...validates) {
    const proms = validates.map((v) => v.validate);
    const result = await Promise.all(proms);
    return result.every((r) => r);
  }
}
