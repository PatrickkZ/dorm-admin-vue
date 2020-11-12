<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>宿舍信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
          :data="dorms"
          stripe
          style="width: 100%"
          :max-height="tableHeight">
        <!--        <el-table-column-->
        <!--            type="selection"-->
        <!--            width="55">-->
        <!--        </el-table-column>-->
        <el-table-column
            label="楼号"
            prop="buildingNum">
        </el-table-column>
        <el-table-column
            label="宿舍号"
            prop="roomNum">
        </el-table-column>
        <el-table-column
            label="容量"
            prop="capacity">
        </el-table-column>
        <el-table-column
            label="剩余床位"
            prop="remain">
        </el-table-column>
        <el-table-column
            label="宿舍类型"
            prop="type" :formatter="genderFormat">
        </el-table-column>
        <el-table-column
            label="是否可选"
            prop="frozen" :formatter="usableFormat">
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
  name: "DormInfo",
  data () {
    return {
      dorms: []
    }
  },
  mounted () {
    this.loadDorms()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    loadDorms(){
      this.$axios.get('/admin/dorm').then(resp => {
        if (resp && resp.data.code === 200) {
          this.dorms = resp.data.result
        }
      })
    },
    genderFormat(row){
      if(row.type === 'M'){
        return '男生宿舍'
      }else {
        return '女生宿舍'
      }
    },
    usableFormat(row){
      if (row.frozen === 0){
        return '是'
      }else {
        return '否'
      }
    }
  }
}
</script>

<style scoped>

</style>
