<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title">后台系统</span>
    </div>
    <div class="menu">
      <el-menu default-active="2" class="el-menu-vertical">
        <template v-for="item in userMenus" :key="item.id">
          <!-- 二级菜单 -->
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="list in item.children" :key="list.id">
                <el-menu-item :index="list.id + ''">
                  <i v-if="list.icon" :class="list.icon"></i>
                  <span>{{ list.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <!-- 一级菜单 -->
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <i class="item.icon"> </i>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)
    return {
      userMenus
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background: #001529;

  .menu {
    height: calc(100% - 48px);
  }
  .logo {
    height: 28px;
    padding: 12px 10px 8px 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      color: white;
    }
  }
}
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}
</style>
