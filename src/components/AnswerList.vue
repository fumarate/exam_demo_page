<template>
    <el-table :data="students" style="width: 100%" stripe="true">
        <el-table-column prop="name" label="学生姓名"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="redo(scope.row.sid)">重做</el-button>
                <el-button @click="viewAnswer(scope.row.sid)">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        axios.get("/student")
            .then(resp => this.students = resp.data.data)
    },
    data() {
        return {

            students: []
        }
    },
    methods: {
        redo(sid) {
            axios.delete("/answer?sid=" + sid + "&paperId=" + this.$route.query.paperId)
                .then(resp => {
                    if (resp.data.data) {
                        alert("已通知重做")
                    }
                })
        },
        viewAnswer(sid) {
            this.$router.push({
                path: "/answer",
                query: {
                    paperId: this.$route.query.paperId,
                    sid: sid,
                    isTeacher:true
                }
            })
        }
    }
}
</script>

<style>
</style>