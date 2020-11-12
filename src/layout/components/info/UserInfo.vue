<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>后台用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
          :data="users"
          stripe
          style="width: 100%"
          :max-height="tableHeight">
        <!--        <el-table-column-->
        <!--            type="selection"-->
        <!--            width="55">-->
        <!--        </el-table-column>-->
        <el-table-column
            label="用户名"
            prop="username">
        </el-table-column>
        <el-table-column
            label="角色"
            prop="roles" :formatter="roleFormatter">
        </el-table-column>
      </el-table>
      <!--      <div style="margin: 20px 0 20px 0;float: left">-->
      <!--        <el-button>取消选择</el-button>-->
      <!--        <el-button>批量删除</el-button>-->
      <!--      </div>-->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.loadUsers()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    loadUsers(){
      this.$axios.get('/admin/user').then(resp => {
        if (resp && resp.data.code === 200) {
          this.users = resp.data.result
        }
      })
    },
    roleFormatter(row){
      var roles = row.roles
      var result = ''
      for(var i=0;i<roles.length;i++){
        result = result+roles[i].description
        result = result+' '
      }
      return result
    }
  }
}
</script>

<style scoped>

</style>
