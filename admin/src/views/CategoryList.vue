<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="380"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="180"></el-table-column>
      <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="updatedAt" label="编辑时间"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      let { data } = await this.$http.get("/rest/categories");
      this.list = data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除分类 "${row.name}"`, "提示", {}).then(
        async () => {
          await this.$http.delete(`/rest/categories/${row._id}`, row);
          // let index = this.list.findIndex(item => item._id === row._id);
          // this.list.splice(index, 1)
          // this.$delete(this.list, index);
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.fetch();
        }
      );
    }
  }
};
</script>

<style></style>
