<template>
  <div>
    <div v-if="registerFlag">
      <el-input v-model="account" placeholder="用户名"></el-input>
      <el-input type="password" v-model="password" placeholder="密码" show-password></el-input>
      <el-input v-model="name" placeholder="姓名"></el-input>
      <el-radio-group v-model="type">
        <el-radio label="student">学生</el-radio>
        <el-radio label="teacher">教师</el-radio>
      </el-radio-group>
      <br />
      <el-button type="primary" plain @click="register">注册</el-button>
      <el-button type="primary" plain @click="registerFlag = false">登录</el-button>
    </div>
    <div v-else>
      <el-input v-model="account" placeholder="用户名"></el-input>
      <el-input type="password" v-model="password" placeholder="密码" show-password></el-input>
      <el-radio-group v-model="type">
        <el-radio label="student">学生</el-radio>
        <el-radio label="teacher">教师</el-radio>
      </el-radio-group>
      <br />
      <el-button type="primary" plain @click="login">登录</el-button>
      <el-button type="primary" plain @click="registerFlag = true">注册</el-button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  mounted() {

  },
  data() {
    return {
      account: null,
      password: null,
      registerFlag: false,
      name: null,
      type: "student"
    }
  },
  methods: {
    login() {
      axios.post("/login", {
        account: this.account,
        password: this.password,
        type: this.type
      }).then(resp => {
        if (resp.data) {
          alert("登陆成功");
          location.reload()
        }
      })

    },
    register() {
      axios.post("/register", {
        account: this.account, name: this.name,
        password: this.password,
        type: this.type
      }).then(resp => {
        if (resp.data) {
          alert("注册成功")
          location.reload()
        }
      })
    }
  }
}
</script>

<style>
</style>