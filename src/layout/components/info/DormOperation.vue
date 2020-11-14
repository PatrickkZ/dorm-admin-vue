<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>分/退/换宿舍</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-dialog title="输入信息" :visible.sync="dialogFormVisible1" width="30%">
      <el-form :model="assignForm">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="assignForm.studentNum" autocomplete="off" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" :label-width="formLabelWidth">
          <el-input v-model="assignForm.roomNum" autocomplete="off" placeholder="请输入宿舍号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submitAssignForm">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="输入信息" :visible.sync="dialogFormVisible2" width="30%">
      <el-form :model="checkoutForm">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="checkoutForm.studentNum" autocomplete="off" placeholder="请输入学号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitCheckoutForm">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="输入信息" :visible.sync="dialogFormVisible3" width="30%">
      <el-form :model="switchForm">
        <el-form-item label="学号" label-width="120px">
          <el-input v-model="switchForm.studentNum" autocomplete="off" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="换入宿舍号" label-width="120px">
          <el-input v-model="switchForm.toRoomNum" autocomplete="off" placeholder="请输入要换入的宿舍号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="submitSwitchForm">提 交</el-button>
      </div>
    </el-dialog>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card :body-style="{ padding: '0px'}">
        <img src="../../../assets/view1.jpg" class="image">
        <div style="padding: 14px;">
          <span>分配宿舍</span>
          <div class="bottom clearfix">
            <el-button type="primary" round @click="dialogFormVisible1 = true">Assign</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card :body-style="{ padding: '0px'}">
        <img src="../../../assets/view2.jpg"
             class="image">
        <div style="padding: 14px;">
          <span>申请退宿</span>
          <div class="bottom clearfix">
            <el-button type="success" round @click="dialogFormVisible2 = true">Checkout</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card :body-style="{ padding: '0px'}">
        <img src="../../../assets/view3.jpg"
             class="image">
        <div style="padding: 14px;">
          <span>申请换宿</span>
          <div class="bottom clearfix">
            <el-button type="warning" round @click="dialogFormVisible3 = true">Switch</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
    </div>
</template>

<script>
export default {
  name: "DormOperation",
  data() {
    return {
      assignForm: {
        studentNum: '',
        roomNum: ''
      },
      checkoutForm: {
        studentNum: ''
      },
      switchForm: {
        studentNum: '',
        toRoomNum: ''
      },
      formLabelWidth: '80px',
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false
    }
  },
  methods: {
    submitAssignForm(){
      this.dialogFormVisible1 = false
      this.$axios
          .post('/admin/dorm/operation/assign', {
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
    submitCheckoutForm(){
      this.dialogFormVisible2 = false
      this.$axios
          .post('/admin/dorm/operation/checkout', {
            studentNum: this.checkoutForm.studentNum
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
    submitSwitchForm() {
      this.dialogFormVisible3 = false
      this.$axios
          .post('/admin/dorm/operation/switch', {
            studentNum: this.switchForm.studentNum,
            toRoomNum: this.switchForm.toRoomNum
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
    }
  }
}
</script>

<style scoped>
.el-card {
  margin-top: 5%;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.el-card__body {
  width: 50%;
}
</style>
