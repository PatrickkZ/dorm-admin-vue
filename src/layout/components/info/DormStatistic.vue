<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>宿舍统计信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
          :data="statistic"
          v-loading="loading"
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
            label="类型"
            prop="type"
            :formatter="typeFormat">
        </el-table-column>
        <el-table-column
            label="总容量"
            prop="capacity">
        </el-table-column>
        <el-table-column
            label="剩余容量"
            prop="remain">
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
  name: "DormStatistic",
  data () {
    return {
      statistic: [],
      loading: true
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    loadData(){
      this.$axios.get('/admin/statistic').then(resp => {
        if (resp && resp.data.code === 200) {
          this.statistic = resp.data.result
          this.loading = false
        }
      })
    },
    typeFormat(row){
      if(row.type === 'M'){
        return '男生宿舍'
      }else {
        return '女生宿舍'
      }
    }
  }
}
</script>

<style scoped>

</style>
