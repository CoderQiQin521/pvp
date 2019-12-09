<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input style="width: 100px;" type="text" v-model="model.code"></el-input>
          <el-image
            style="width: 100px;padding-top: 20px;"
            ref="codeimg"
            @click="refishs()"
            src="http://localhost:3200/getcode?d=1"
          ></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "admin",
        password: "111111",
        code: ""
      }
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("/login", this.model);
      localStorage.setItem("token", res.data.token);
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功"
      });
    },
    async refishs() {
      this.$refs.codeimg.src = "http://localhsot:3200/getcode?d=" + 5;
    }
  }
};
</script>

<style>
.login-container {
}
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>