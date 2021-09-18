<template>
  <div class="login-phone">
    <el-form label-width="80px" :rules="rules" :model="state" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="state.phone"></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="cord">
        <div class="button">
          <el-input v-model="state.cord"></el-input>
          <el-button type="primary" class="send-cord-btn">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
// 导入表单验证规则
import { rules } from '../config/phone-config'
export default defineComponent({
  setup() {
    const state = reactive({
      phone: '',
      cord: ''
    })
    let formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()
    const loginAction = () => {
      if (formRef.value?.validate) {
        store.dispatch('login/phoneLoginAction', { ...state })
      }
    }
    return {
      state,
      rules
    }
  }
})
</script>

<style scoped lang="less">
.button {
  display: flex;

  .send-cord-btn {
    margin: 0 8px;
  }
}
</style>
