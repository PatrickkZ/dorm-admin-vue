<template>
  <div>
    <el-dialog
        title="修改用户信息"
        :visible.sync="dialogFormVisible1">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="学号" label-width="100px" prop="studentNum">
          <label>{{selectedUser.studentNum}}</label>
        </el-form-item>
        <el-form-item label="真实姓名" label-width="100px" prop="name">
          <el-input v-model="selectedUser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px" prop="gender">
          <el-input v-model="selectedUser.gender" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" label-width="100px" prop="grade">
          <el-input v-model="selectedUser.grade" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" label-width="100px" prop="major">
          <el-input v-model="selectedUser.major" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="modifyStuInfo(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="重置密码"
        :visible.sync="dialogFormVisible2">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="学号" label-width="120px" prop="studentNum">
          <label>{{selectedUser.studentNum}}</label>
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
        <el-button type="primary" @click="modifyStuPassword(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="添加学生"
        :visible.sync="dialogFormVisible3">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item label="学号" label-width="120px">
          <el-input v-model="newStudent.studentNum" placeholder="请输入学号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="newStudent.name" placeholder="请输入姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-input v-model="newStudent.gender" placeholder="请输入性别(M或F)" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年级" label-width="120px">
          <el-input v-model="newStudent.grade" placeholder="请输入年级" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="专业" label-width="120px">
          <el-input v-model="newStudent.major" placeholder="请输入专业" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="addStudent()">添 加</el-button>
      </div>
    </el-dialog>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>学生信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-button @click="dialogFormVisible3 = true" type="success" size="small" style="float: right">
        <i class="el-icon-circle-plus-outline"></i>
        添加学生
      </el-button>
      <el-table
          :data="students"
          v-loading="loading"
          stripe
          style="width: 100%"
          :max-height="tableHeight">
<!--        <el-table-column-->
<!--            type="selection"-->
<!--            width="55">-->
<!--        </el-table-column>-->
        <el-table-column
            label="学号"
            prop="studentNum">
        </el-table-column>
        <el-table-column
            label="姓名"
            prop="name">
        </el-table-column>
        <el-table-column
            label="性别"
            prop="gender"
            :formatter="genderFormat">
        </el-table-column>
        <el-table-column
            label="年级"
            prop="grade">
        </el-table-column>
        <el-table-column
            label="专业"
            prop="major">
        </el-table-column>
        <el-table-column
            label="楼号"
            prop="dorm.buildingNum">
        </el-table-column>
        <el-table-column
            label="宿舍号"
            prop="dorm.roomNum">
        </el-table-column>
        <el-table-column
            label="操作"
        width="180%">
          <template slot-scope="scope">
            <el-button
                @click="editStudent(scope.row)"
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
  name: "StudentInfo",
  data () {
    return {
      students: [],
      selectedUser: [],
      loading: true,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      resetPassword: '',
      confirmPassword: '',
      newStudent: {
        studentNum: '',
        name: '',
        gender: '',
        grade: '',
        major: ''
      }
    }
  },
  mounted () {
    this.loadStudents()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    loadStudents(){
      this.$axios.get('/admin/student').then(resp => {
        if (resp && resp.data.code === 200) {
          this.students = resp.data.result
          this.loading = false
        }
      })
    },
    genderFormat(row){
      if(row.gender === 'M'){
        return '男'
      }else {
        return '女'
      }
    },
    modifyStuInfo(student){
      this.dialogFormVisible1 = false
      this.$axios.put('/admin/student', {
        studentNum: student.studentNum,
        name: student.name,
        gender: student.gender,
        grade: student.grade,
        major: student.major
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户信息修改成功')
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadStudents()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    modifyStuPassword(student){
      if (this.resetPassword !== this.confirmPassword){
        this.$alert('两次输入的密码不同')
        return
      }
      this.dialogFormVisible2 = false
      this.$axios.put('/admin/student/password', {
        studentNum: student.studentNum,
        password: this.resetPassword
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码修改成功')
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadStudents()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    addStudent(){
      this.dialogFormVisible3 = false
      this.$axios.post('/admin/student/add', {
        studentNum: this.newStudent.studentNum,
        name: this.newStudent.name,
        gender: this.newStudent.gender,
        grade: this.newStudent.grade,
        major: this.newStudent.major
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('添加成功')
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadStudents()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    editStudent(student){
      this.dialogFormVisible1 = true
      this.selectedUser = student
    },
    resetPass(student){
      this.dialogFormVisible2 = true
      this.selectedUser = student
    }
  }
}
</script>

<style scoped>

</style>
