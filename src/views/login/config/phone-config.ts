export const rules = {
  phone: [
    {
      required: true,
      message: '手机号不能为空',
      trigger: 'blur'
    },
    {
      pattern:
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  cord: [
    {
      required: true,
      message: '验证码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^\d{6}$/,
      message: '验证码必须由6个数字组成',
      trigger: 'blur'
    }
  ]
}
