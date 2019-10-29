<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="128px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="名称" required>
        <el-input v-model="model.name" required></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <p>
      <small>技术栈:</small>
      node + express + mongoose + vue + element-ui + axios
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      res: {}
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.res = res;
    }
  }
};
</script>

<style></style>
