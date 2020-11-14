<template>
  <div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
    append-to-body>
      <span>确定要退出吗</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="logout">确 定</el-button>
  </span>
    </el-dialog>
  <el-card class="admin-header">
      <img src="../assets/icon1.jpg" alt="" width="30px" style="float: left;margin-top: -5px;">
    <span style="font-size: 20px;font-weight: bold;position:absolute;left: 70px">宿舍后台管理系统</span>
    <i class="el-icon-switch-button" v-on:click="dialogVisible = true" style="font-size: 30px;float: right"></i>
  </el-card>
  </div>
</template>

<script>
// import {createRouter} from '../../router'

export default {
  name: 'Header',
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    logout () {
      const _this = this;
      this.dialogVisible = false
      this.$axios.get('/logout').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.$store.commit('logout')
          _this.$router.replace('/login')
        }
      }).catch(failResponse => {
        console.log(failResponse)
      })
    }
  }
}
</script>

<style scoped>
.admin-header {
  height: 60px;
  opacity: 0.85;
  line-height: 30px;
  min-width: 900px;
}
.el-icon-switch-button {
  cursor: pointer;
  outline:0;
}
</style>
