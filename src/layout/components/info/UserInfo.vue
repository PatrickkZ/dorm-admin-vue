<template>
  <div>
    <el-dialog
        title="修改后台用户信息"
        :visible.sync="dialogFormVisible1">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <label>{{selectedUser.username}}</label>
        </el-form-item>
        <el-form-item label="角色修改" label-width="100px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.description}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="modifyUserInfo(selectedUser)">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="重置密码"
        :visible.sync="dialogFormVisible2">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <label>{{selectedUser.username}}</label>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px">
          <el-input v-model="resetPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="120px" prop="gender">
          <el-input v-model="confirmPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="modifyUserPassword(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>

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
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click="editUser(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit" circle>
            </el-button>
            <el-button
                @click="resetPass(scope.row)"
                type="warning"
                size="mini"
                icon="el-icon-view" circle>
            </el-button>
            <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete" circle>
            </el-button>
          </template>
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
      users: [],
      roles: [],
      selectedUser: [],
      selectedRolesIds: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      resetPassword: '',
      confirmPassword: ''
    }
  },
  mounted () {
    this.loadUsers()
    this.loadRoles()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    loadUsers(){
      this.$axios.get('/admin/user/background').then(resp => {
        if (resp && resp.data.code === 200) {
          this.users = resp.data.result
        }
      })
    },
    loadRoles(){
      this.$axios.get('/admin/user/background/role').then(resp => {
        if (resp && resp.data.code === 200) {
          this.roles = resp.data.result
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
    },
    modifyUserInfo(user){
      let selectedRoles = []
      for (let i = 0;i<this.selectedRolesIds.length;i++){
        for (let j = 0; j < this.roles.length; j++) {
          if (this.selectedRolesIds[i] === this.roles[j].id) {
            selectedRoles.push(this.roles[j])
          }
        }
      }

      this.$axios.put('/admin/user/background/role', {
        id: user.id,
        username: user.username,
        roles: selectedRoles
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户权限修改成功')
          this.dialogFormVisible1 = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadUsers()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    modifyUserPassword(user){
      if (this.resetPassword !== this.confirmPassword){
        this.$alert('两次输入的密码不同')
        return
      }
      this.dialogFormVisible2 = false
      this.$axios.put('/admin/user/background/password', {
        username: user.username,
        password: this.resetPassword
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码修改成功')
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadUsers()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    editUser(row){
      this.dialogFormVisible1 = true
      this.selectedUser = row
    },
    resetPass(user){
      this.dialogFormVisible2 = true
      this.selectedUser = user
    }
  }
}
</script>

<style scoped>

</style>
