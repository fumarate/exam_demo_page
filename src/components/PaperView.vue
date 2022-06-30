<template>
    <el-row justify="start">
        <el-col :span="10">
        
            <div>
                <span>选择题</span><br />
                <el-button :type="paper.problems[index].choice < 0 ? 'danger' : 'primary'"
                    v-for="index in Array.from(new Array(this.paper.problems.length).keys())" :key="index"
                    @click="this.problemIndex = index">
                    {{ index + 1 }}
                </el-button>
            </div>
        </el-col>
        <el-col :span="14">
            <div>
                <span>{{ problemIndex + 1 }}. {{ problem.problem }}</span>
                <br />
                <el-radio-group v-model="problem.choice">
                    <el-radio v-for="(choice, index) in this.problem.choices" :key="index" :label="index">
                        {{ String.fromCharCode(index + 65) }}{{ choice }}
                    </el-radio>
                </el-radio-group>
                <br />
                <el-button :disabled="problemIndex == 0" type="primary" @click="problemIndex -= 1">上一题</el-button>
                <el-button :disabled="problemIndex >= paper.problems.length - 1" type="primary"
                    @click="problemIndex += 1">下一题</el-button>
            </div>
        </el-col>
        <el-button @click="uploadPaper">交卷</el-button>
    </el-row>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        axios.get("http://127.0.0.1:8080/paper/" + this.$route.query.paperId)
            .then(resp => { this.paper = resp.data })
        console.log(this.paper)
    },
    data() {
        return {
            problemIndex: 0,
            paper: {
                problems: [{
                    problem:"",
                    choices:["",""],
                    choice:0
                }]
            }
        }
    },
    methods: {
        uploadPaper() {

        }
    },
    computed: {
        problem() {
            if (this.problemIndex >= 0 && this.problemIndex < this.paper.problems.length)
                return this.paper.problems[this.problemIndex]
        }
    }
}
</script>

<style>
</style>