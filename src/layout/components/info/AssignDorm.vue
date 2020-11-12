<template>
  <el-form :model="assignForm" :rules="rules" ref="ruleForm" label-width="100px" class="assign-Form">
    <el-form-item label="学号" prop="name">
      <el-input v-model="assignForm.studentNum"></el-input>
    </el-form-item>
    <el-form-item label="宿舍号" prop="dorm">
      <el-input v-model="assignForm.roomNum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AssignDorm",
  data(){
    return {
      assignForm: {
        studentNum: '',
        roomNum: ''
      },
      rules: {
        name: [
          {require: true, message: '请输入学号', trigger: 'blur'}
        ],
        dorm: [
          {require: true, message: '请输入房间号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(){
      if(this.assignForm.studentNum===''||this.assignForm.roomNum===''){
        return
      }
      this.$axios
          .post('/admin/assign', {
            studentNum: this.assignForm.studentNum,
            roomNum: this.assignForm.roomNum
          })
          .then(resp => {
            if (resp.data.code === 200) {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {
            console.log(failResponse)
          })
    },
    resetForm() {
      this.assignForm.studentNum=''
      this.assignForm.roomNum=''
    }
  }
}
</script>

<style scoped>
.assign-Form {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
