<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>学生信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
          :data="students"
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
      students: []
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
        }
      })
    },
    genderFormat(row){
      if(row.gender === 'M'){
        return '男'
      }else {
        return '女'
      }
    }
  }
}
</script>

<style scoped>

</style>
