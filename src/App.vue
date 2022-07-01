<template>
  <div class="header">
    <span> 在线考试平台</span>
    <span>{{ isLogin ? this.user.name + '的试卷' : '请登录' }}</span>
    <el-button type="danger" @click="logout" :disabled="!isLogin">退出登录</el-button>
  </div>
  <div class="root">
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted() {
    this.isLogin = false;
    axios.get("/auth")
      .then(resp => {
        let result = resp.data
        if (result.status == 0) {
          this.isLogin = true;
          this.user = result.data
          this.$router.push("/")
        } else {
          this.$router.push("/login")
        }
      })
  },
  data() {
    return {
      isLogin: false,
      user: {

      }
    };
  },
  methods: {
    logout() {
      axios.get("/logout").then(resp => {
        if (resp.data) {
          alert("注销成功！")
          location.reload()
        }
      })
    }
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  padding: 20px;
  background-color: grey;
  color: white;
  display: flex;
  justify-content: space-around;
}

.root{
    width:75%;
   margin:auto
}
</style>
