<template>
    <el-row justify="start">
        <el-col :span="10">
            <div>
                <span>选择题</span><br />
                <el-button :type="paper.problems[index].answer < 0 ? 'danger' : 'primary'"
                    v-for="index in Array.from(new Array(paper.problems.length).keys())" :key="index"
                    @click="this.problemIndex = index">
                    {{ index + 1 }}
                </el-button>
            </div>
        </el-col>
        <el-col :span="14">
            <div>
                <span>{{ problemIndex + 1 }}. {{ problem.problem }}({{ problem.score }}分)</span>
                <br />
                <el-radio-group v-model="problem.answer" :disabled="this.answered">
                    <el-radio v-for="(choice, index) in this.problem.choices" :key="index" :label="index">
                        {{ String.fromCharCode(index + 65) }}. {{ choice }}
                    </el-radio>
                </el-radio-group>
                <br />
                <span v-if="this.answered">已选答案：{{ String.fromCharCode(problem.answer + 65)
                }}正确答案：{{ String.fromCharCode(problem.choice + 65) }}</span>
                <el-button :disabled="problemIndex == 0" type="primary" @click="problemIndex -= 1">上一题</el-button>
                <el-button :disabled="problemIndex >= paper.problems.length - 1" type="primary"
                    @click="problemIndex += 1">下一题</el-button>
            </div>
        </el-col>
        <el-button @click="uploadPaper" :disabled="answered">{{  this.answered ? '已完成' :this.inTime ? '交卷' : '试卷已过期' }}
        </el-button>
        <div v-if="this.answered">
            <span>分数：{{ score[0] }}/{{ score[1] }}</span>
        </div>

    </el-row>
</template>

<script>
import axios from 'axios'
export default {
    mounted() {
        axios.get("/paper/" + this.$route.query.paperId)
            .then(resp => {
                this.paper = resp.data.data;
            })
        axios.get("/answer?paperId=" + this.$route.query.paperId + (('sid' in this.$route.query) ? "&sid=" + this.$route.query.sid : ""))
            .then(resp => {
                let result = resp.data.data;
                console.log(result)
                if (result.answers != null) {
                    for (var i = 0; i < result.answers.length; i++) {
                        for (var j = 0; j < this.paper.problems.length; j++) {
                            if (result.answers[i].problemId == this.paper.problems[j].problemId) {
                                this.paper.problems[j]['answer'] = result.answers[i].answer;
                            }
                        }
                    }
                    this.answered = true;
                } else if ('isTeacher' in this.$route.query && this.$route.query.isTeacher) {
                    alert("此人未完成试卷！")
                    this.$router.push({
                        path: "/view",
                        query: {
                            paperId: this.$route.query.paperId
                        }
                    })
                }
            })
    },
    data() {
        return {
            problemIndex: 0,
            answers: [],
            answered: false,
            paper: {
                problems: [{
                    problemId: null,
                    problem: "",
                    choices: ["", ""],
                    choice: 0
                }]
            }
        }
    },
    methods: {
        uploadPaper() {
            let answer = {
                paperId: this.paper.paperId,
                answers: []
            };
            for (var i = 0; i < this.paper.problems.length; i++) {
                answer.answers.push({
                    problemId: this.paper.problems[i].problemId,
                    answer: this.paper.problems[i].answer
                })
            }
            axios.post("/answer", answer)
                .then(resp => {
                    if (resp.data.data) {
                        alert("提交成功！")
                        this.$router.push('/')
                    }
                })
        }
    },
    computed: {
        problem() {
            if (this.problemIndex >= 0 && this.problemIndex < this.paper.problems.length)
                return this.paper.problems[this.problemIndex]
        },
        answer() {
            return this.answers[this.problemIndex]
        },
        score() {
            var p = 0;
            var q = 0;
            for (var i = 0; i < this.paper.problems.length; i++) {
                if (this.paper.problems[i].answer == this.paper.problems[i].choice) {
                    p += this.paper.problems[i].score
                }
                q += this.paper.problems[i].score
            }
            return [p, q]
        },
        inTime() {

            function convertDateFromString(dateString) {
                if (dateString) {
                    var arr1 = dateString.split(" ");
                    var sdate = arr1[0].split('-');
                    var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
                    return date;
                }
            }
            var ed = convertDateFromString(this.paper.endTime)
            return ed > (new Date())
        }
    }
}
</script>

<style>
</style>