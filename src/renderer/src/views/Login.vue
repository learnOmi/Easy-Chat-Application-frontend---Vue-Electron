<template>
  <div class="login-panel">
    <div class="title drag">登录</div>
    <div class="login-form">
      <div class="error-ms"></div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="0px"
        @submit.prevent
      >
        <!--input输入-->
        <el-form-item prop="email">
          <el-input
            size="large"
            clearable
            placeholder="请输入邮箱"
            v-model.trim="formData.email"
          >
            <template #prefix><icon class="iconfont icon-youxiang" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            clearable
            show-password
            placeholder="请输入密码"
            v-model.trim="formData.password"
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
          >
            <template #prefix><icon class="iconfont icon-anquan" /></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="">
          <el-button type="primary" class="login-btn" @click="">登录</el-button>
        </el-form-item>
        <div class="bottom-link">
          <span class="a-link" href="javascript:void(0)" @click="">没有账号?</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入内容" }],
};
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
