<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="_id" label="ID" width="380"> </el-table-column>
    <el-table-column prop="name" label="分类名称" width="180">
    </el-table-column>
    <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
    <el-table-column prop="updatedAt" label="编辑时间"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async created() {
    let { data } = await this.$http.get('/categories')
    this.list = data
  },
  methods: {
    async del(_item) {
      let index = this.list.findIndex(item => item._id === _item._id)
      // this.list.splice(index, 1)
      this.$delete(this.list, index)
      await this.$http.post('/del_categories', { id: _item._id })
    }
  }
}
</script>

<style></style>
