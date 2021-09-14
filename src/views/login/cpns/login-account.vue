<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="state">
      <el-form-item label="帐号" prop="name">
        <el-input v-model="state.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="state.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button>提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    let state = reactive({
      name: '',
      password: ''
    })
    const rules = {
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
          pattern: /^[a-z0-9]{5,17}$/,
          message: '密码必须由6-18个数字或者字母组成',
          trigger: 'blur'
        }
      ]
    }
    return {
      state,
      rules
    }
  }
})
</script>

<style scoped></style>
