export const rules = {
  name: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,17}$/,
      message: '用户名必须由6-18个数字或者字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,17}$/,
      message: '密码必须由6-17个数字或者字母组成',
      trigger: 'blur'
    }
  ]
}
