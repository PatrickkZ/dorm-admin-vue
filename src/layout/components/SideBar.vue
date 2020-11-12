<template>
  <el-aside width="200px">
    <el-menu
        default-active=""
        router
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <div v-for="(item,i) in adminMenus" :key="i">
        <div v-if="item.nameZh==='用户管理'">
          <el-submenu :index="i+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.nameZh }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/student">学生用户</el-menu-item>
              <el-menu-item index="/admin/user">后台用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="item.route" :key="i">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.nameZh}}</span>
          </el-menu-item>
        </div>
      </div>
<!--      <el-menu-item v-for="(item,i) in adminMenus" :index="item.route" :key="i">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">{{item.nameZh}}</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "SideBar",
  computed: {
    adminMenus () {
      return this.$store.state.adminMenus
    }
  }
}
</script>

<style scoped>

</style>
