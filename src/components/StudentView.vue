<template>
    <el-table :data="papers" style="width: 100%" stripe="true">
        <el-table-column prop="title" label="试卷" />
        <el-table-column prop="endTime" label="截止时间"/>
        <el-table-column align="center">
            <template #header>
                <span>操作</span>
            </template>
            <template #default="scope">
                <el-button size="small" type="primary" @click="answerPaper(scope.row.paperId)">作答
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
export default {
    props:['user'],
    mounted(){
        axios.get("/paper")
        .then((resp)=>{this.papers = resp.data.data})
    },
    data() {
        return {
            papers: [
            ]
        }
    },
    methods: {
        answerPaper(paperId) {
            this.$router.push({path:"/answer",query:{paperId:paperId}})
        }
    }

}
</script>

<style>
.header {
    background-color: grey;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
}
</style>