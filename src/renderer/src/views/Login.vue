<template>
  <div class="login-panel">
    <div class="title drag">{{ isLogin ? '登录' : '注册' }}</div>
    <div class="login-form">
      <div class="error-ms">{{ errorMS }}</div>
      <el-form :model="formData" ref="formDataRef" label-width="0px" @submit.prevent>
        <!--input输入-->
        <el-form-item prop="email">
          <el-input
            size="large"
            clearable
            placeholder="请输入邮箱"
            maxLength="30"
            v-model.trim="formData.email"
            @focus="clearVerify"
          >
            <template #prefix><icon class="iconfont icon-youxiang" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname" v-if="!isLogin">
          <el-input
            size="large"
            clearable
            placeholder="请输入昵称"
            maxLength="15"
            v-model.trim="formData.nickname"
            @focus="clearVerify"
          >
            <template #prefix><icon class="iconfont icon-geren" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            clearable
            show-password
            placeholder="请输入密码"
            v-model.trim="formData.password"
            @focus="clearVerify"
          >
            <template #prefix><icon class="iconfont icon-quanxian" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" v-if="!isLogin">
          <el-input
            size="large"
            clearable
            show-password
            v-model.trim="formData.repassword"
            placeholder="请再次输入密码"
            @focus="clearVerify"
          >
            <template #prefix><icon class="iconfont icon-quanxian" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <el-input
            size="large"
            clearable
            show-password
            placeholder="请输入验证码"
            v-model.trim="formData.checkcode"
            @focus="clearVerify"
          >
            <template #prefix><icon class="iconfont icon-anquan" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-button type="primary" class="login-btn" @click="submit">{{
            isLogin ? '登录' : '注册'
          }}</el-button>
        </el-form-item>
        <div class="bottom-link">
          <span class="a-link" href="javascript:void(0)" @click="changeOpType">{{
            isLogin ? '没有账号?' : '已有账号'
          }}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
const { proxy } = getCurrentInstance()

const formData = ref({})
const formDataRef = ref()
const errorMS = ref('')
const isLogin = ref(true)

const changeOpType = () => {
  window.electron.ipcRenderer.send('loginOrRegister', !isLogin.value)
  isLogin.value = !isLogin.value
  nextTick(() => {
    formDataRef.value.resetFields()
    clearVerify()
  })
}

const submit = () => {
  // formDataRef.value.validate(async (valid) => {
  //   if (valid) {
  //     window.electron.ipcRenderer.send('loginOrRegister', formData.value);
  //   } else {
  //     return ;
  //   }
  // });
  clearVerify()
  if (!checkValue('checkEmail', formData.value.email, '请输入正确的邮箱')) {
    return
  }

  if (!isLogin.value && !checkValue('', formData.value.nickname, '请输入昵称')) {
    return
  }

  if (
    !checkValue('checkPassword', formData.value.password, '密码只能是数字、字母、特殊字符8-16位')
  ) {
    return
  }

  if (!isLogin.value && formData.value.password !== formData.value.repassword) {
    errorMS.value = '两次密码输入不一致'
    return
  }

  if (!checkValue('', formData.value.checkcode, '请输入正确的验证码')) {
    return
  }
}

const checkValue = (type, value, msg) => {
  // 判空
  if (proxy.Utils.isEmpty(value)) {
    errorMS.value = msg
    return false
  }

  // 类型校验；type 和 Verify 中的函数对应使用
  if (type && !proxy.Verify[type](value)) {
    errorMS.value = msg
    return false
  }

  return true
}

const clearVerify = () => {
  errorMS.value = ''
}
</script>

<style lang="scss" scoped>
.email-select {
  width: 250px;
}
.loading-panel {
  height: calc(100vh - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 300px;
  }
}
.login-panel {
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  .title {
    height: 30px;
    padding: 5px 0px 0px 10px;
  }

  .login-form {
    padding: 0px 15px 29px 15px;
    :deep(.el-input__wrapper) {
      box-shadow: none;
      border-radius: none;
    }
    .el-form-item {
      border-bottom: 1px solid #ddd;
    }

    .email-panel {
      align-items: center;
      width: 100%;
      display: flex;
      .input {
        flex: 1;
      }
      .icon-dom {
        margin-left: 3px;
        width: 16px;
        cursor: pointer;
        border: none;
      }
    }
    .error-ms {
      line-height: 30px;
      height: 30px;
      color: #f56c6c;
    }
    .check-code-panel {
      display: flex;
      .check-code {
        cursor: pointer;
        width: 120px;
        margin-left: 5px;
      }
    }

    .login-btn {
      margin-top: 20px;
      width: 100%;
      background: #07c160;
      height: 36px;
      font-size: 16px;
    }
    .bottom-link {
      text-align: right;
    }
  }
}
</style>
