<template>
  <div class="about">
    <h1>创建分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称" required>
        <el-input v-model="model.name" required></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      res: {}
    }
  },
  methods: {
    async save() {
      // if (this.model.name === '') {
      //   this.$message.error('请填写名称')
      //   return
      // }
      const res = await this.$http.post('/categories', this.model)
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.res = res
    }
  }
}
</script>

<style></style>
