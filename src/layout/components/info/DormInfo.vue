<template>
  <div>
    <el-dialog
        title="修改宿舍信息"
        :visible.sync="dialogFormVisible1">
      <el-form v-model="selectedDorm" style="text-align: left" ref="dataForm">
        <el-form-item label="楼号" label-width="100px" prop="buildingNum">
          <label>{{selectedDorm.buildingNum}}</label>
        </el-form-item>
        <el-form-item label="宿舍号" label-width="100px" prop="roomNum">
          <label>{{selectedDorm.roomNum}}</label>
        </el-form-item>
        <el-form-item label="容量" label-width="100px" prop="capacity">
          <el-input v-model="selectedDorm.capacity" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="剩余床位" label-width="100px" prop="remain">
          <el-input v-model="selectedDorm.remain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宿舍类型" label-width="100px" prop="type">
          <el-input v-model="selectedDorm.type" placeholder="M或F" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可选" label-width="100px" prop="frozen">
          <el-input v-model="selectedDorm.frozen" placeholder="输入0或1(0:不可选 1:可选)" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="modifyDormInfo(selectedDorm)">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog
        title="添加宿舍"
        :visible.sync="dialogFormVisible2">
      <el-form style="text-align: left" ref="dataForm">
        <el-form-item label="楼号" label-width="120px">
          <el-input v-model="newDorm.buildingNum" placeholder="请输入楼号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房间号" label-width="120px">
          <el-input v-model="newDorm.roomNum" placeholder="请输入房间号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="容量" label-width="120px">
          <el-input v-model="newDorm.capacity" placeholder="请输入容量" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="剩余床位" label-width="120px">
          <el-input v-model="newDorm.remain" placeholder="请输入剩余床位数" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
          <el-input v-model="newDorm.type" placeholder="请输入房间类型（M或F）" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可选" label-width="120px">
          <el-input v-model="newDorm.frozen" placeholder="请输入0或1(0:不可选 1:可选)" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addDorm()">添 加</el-button>
      </div>
    </el-dialog>

    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>宿舍信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-button @click="dialogFormVisible2 = true" type="success" size="small" style="float: right">
        <i class="el-icon-circle-plus-outline"></i>
        添加宿舍
      </el-button>
      <el-table
          :data="dorms"
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
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click="editDorm(scope.row)"
                type="primary"
                size="mini"
                icon="el-icon-edit" circle>
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
  name: "DormInfo",
  data () {
    return {
      dorms: [],
      selectedDorm: [],
      loading: true,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      newDorm: {
        buildingNum: '',
        roomNum: '',
        capacity: '',
        remain: '',
        type: '',
        frozen: ''
      }
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
          this.loading = false
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
        return '否'
      }else {
        return '是'
      }
    },
    modifyDormInfo(dorm){
      this.dialogFormVisible1 = false
      this.$axios.put('/admin/dorm/update', {
        id: dorm.id,
        buildingNum: dorm.buildingNum,
        roomNum: dorm.roomNum,
        capacity: dorm.capacity,
        remain: dorm.remain,
        type: dorm.type,
        frozen: dorm.frozen
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('宿舍信息修改成功')
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadDorms()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    addDorm(){
      this.dialogFormVisible2 = false
      this.$axios.post('/admin/dorm/add', {
        buildingNum: this.newDorm.buildingNum,
        roomNum: this.newDorm.roomNum,
        capacity: this.newDorm.capacity,
        remain: this.newDorm.remain,
        type: this.newDorm.type,
        frozen: this.newDorm.frozen
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('添加成功')
          // 修改角色后重新请求用户信息，实现视图更新
          this.loadDorms()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    editDorm(dorm){
      this.dialogFormVisible1 = true
      this.selectedDorm = dorm
    },
  }
}
</script>

<style scoped>

</style>
