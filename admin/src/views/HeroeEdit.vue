<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="128px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-tabs type="border-card" value="skills">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称" required>
            <el-input v-model="model.name" required></el-input>
          </el-form-item>
          <el-form-item label="称号" required>
            <el-input v-model="model.title" required></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <el-image v-if="model.avatar" fit="cover" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型" required>
            <el-select v-model="model.categories" multiple required>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" required>
            <el-rate
              v-model="model.scores.difficult"
              :max="9"
              show-score
              style="margin-top:0.6rem"
              required
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能" required>
            <el-rate
              v-model="model.scores.skills"
              :max="9"
              show-score
              style="margin-top:0.6rem"
              required
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击" required>
            <el-rate
              v-model="model.scores.attack"
              :max="9"
              show-score
              style="margin-top:0.6rem"
              required
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存" required>
            <el-rate
              v-model="model.scores.survive"
              :max="9"
              show-score
              style="margin-top:0.6rem"
              required
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装" required>
            <el-select v-model="model.items1" multiple required>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" required>
            <el-select v-model="model.items2" multiple required>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>
            添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => item.icon = res.url"
                >
                  <el-image v-if="item.icon" fit="cover" :src="item.icon" class="avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">技术栈</el-divider>
    <el-row>
      <el-col :offset="2" :span="8">
        <dl>
          <dt>后端</dt>
          <dd>nodeJS</dd>
          <dd>express</dd>
          <dd>mongodb + mongoose</dd>
        </dl>
      </el-col>
      <el-col :span="12">
        <dl>
          <dt>前端</dt>
          <dd>vue</dd>
          <dd>element-ui</dd>
          <dd>axios</dd>
        </dl>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: []
      },
      fileList: [],
      res: {},
      categories: [],
      items: []
    };
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.id && this.fetch();
  },
  methods: {
    afterUpload(res) {
      // this.model.icon = res.url;
      this.$set(this.model, "avatar", res.url);
    },
    async fetch() {
      let res = await this.$http.get(`/rest/heroe/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      let res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      let res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/heroe/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/heroe", this.model);
      }
      this.$router.push("/heroe/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.res = res;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
