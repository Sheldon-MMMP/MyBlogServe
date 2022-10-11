module.exports = {
  apiSuccess(data = '', msg = 'ok', code = 200) {
    this.body = { msg, data };
    this.status = code;
  },
  apiFail(data = '', msg = 'fail', code = 400) {
    this.body = { msg, data };
    this.status = code;
  },
  // 生成token
  getToken(value) {
    return this.app.jwt.sign(value, this.app.config.jwt.secret);
  },
};
