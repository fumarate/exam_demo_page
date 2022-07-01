<template>
  <el-table :data="papers" style="width: 100%" stripe="true">
    <el-table-column prop="paperId" label="试卷编号" width="100"></el-table-column>
    <el-table-column prop="title" label="试卷题目" width="180" />
    <el-table-column align="right" width="180">
      <template #header>
        <el-button @click="createPaper">新建试卷</el-button>
      </template>
      <template #default="scope">
        <el-button type="primary" @click="viewPaper(scope.row.paperId)">预览</el-button>
        <el-button type="primary" @click="viewAnswer(scope.row.paperId)">查看</el-button>
        <el-button @click="deletePaper(scope.row.paperId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from 'axios'
export default {
  mounted() {
    this.getPapers()
  },
  data() {
    return {
      papers: [

      ]
    }
  },
  methods: {
    viewPaper(paperId) {
      this.$router.push({ path: "/answer", query: { paperId: paperId } })
    },
    getPapers() {
      axios.get("/paper")
        .then(resp => {
          let result = resp.data;
          this.papers = result.data
        })
    },
    deletePaper(paperId) {
      axios.delete("/paper/" + paperId)
        .then(resp => {
          let result = resp.data;
          if (result) {
            alert("删除成功");
            location.reload()
          }
        })
    },
    createPaper() {
      this.$router.push("/edit")
    },
    viewAnswer(paperId) {
      this.$router.push({
        path: "/view",
        query: {
          paperId: paperId
        }
      })
    }
  },
}
</script>

<style>
</style>