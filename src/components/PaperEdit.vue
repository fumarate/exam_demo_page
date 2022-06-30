<template>
    <el-row justify="start">
        <el-col :span="6">
        <div>
            <el-input v-model="paper.title">
            <template #prepend>
                <span>标题</span>
            </template></el-input>
        </div>
            <div>
                <span>选择题</span><br />
                <el-button :type="paper.problems[index].choice < 0 ? 'danger' : 'primary'"
                    v-for="index in Array.from(new Array(this.paper.problems.length).keys())" :key="index"
                    @click="this.problemIndex = index">
                    {{ index + 1 }}
                </el-button>
                <el-button @click="addProblem">+</el-button>
            </div>
        </el-col>
        <el-col :span="18">
            <div>

                <el-input v-model="problem.problem">
                    <template #prepend>
                        <span>{{ problemIndex + 1 }}.</span>
                    </template>
                </el-input>

                <br />
                <el-radio-group v-model="problem.choice">
                    <el-radio v-for="(_, index) in this.problem.choices" :key="index" :label="index">
                        <el-input v-model="problem.choices[index]">
                            <template #prepend>
                                <span>{{ String.fromCharCode(index + 65) }}</span>
                            </template>
                            <template #append>
                                <el-button :disabled="problem.choices.length <= 2" @click="deleteChoice(index)">删除
                                </el-button>
                            </template>
                        </el-input>
                    </el-radio>
                </el-radio-group>
                <br />
                <el-button @click="addChoice">添加选项</el-button>
                <el-input v-model="problem.score">
                    <template #prepend>
                        <span>分值</span>
                    </template>
                </el-input>
                <br />
                <el-button :disabled="problemIndex == 0" type="primary" @click="problemIndex -= 1">上一题</el-button>
                <el-button :disabled="problemIndex >= paper.problems.length - 1" type="primary"
                    @click="problemIndex += 1">下一题</el-button>
            </div>
        </el-col>
        <el-date-picker v-model="paper.endTime" type="datetime" placeholder="截止时间"
            :shortcuts="shortcuts" />
        <el-button @click="uploadPaper">保存</el-button>
    </el-row>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            problemIndex: 0,
            paper: {
                title: "示例题目",
                problems: [
                    {
                        id: 1,
                        problem: "示例问题",
                        choices: [
                            "选项1", "选项2", "选项3", "选项4"
                        ], choice: -1,
                        score: 10
                    }
                ],
                endTime: null
            },
            shortcuts: [
                {
                    text: '一天后',
                    value: () => {
                        const date = new Date()
                        date.setTime(date.getTime() + 3600 * 1000 * 24)
                        return date
                    },
                },
                {
                    text: '一周后',
                    value: () => {
                        const date = new Date()
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                        return date
                    },
                },
            ]
        }
    },
    methods: {
        addProblem() {
            this.paper.problems.push({
                problem: "",
                choices: ["", ""],
                choice: -1,
                score: 10
            })
        },
        addChoice() {
            this.problem.choices.push("")
        },
        deleteChoice(index) {
            this.problem.choices.splice(index, 1)
        },
        uploadPaper() {
            let choiceAssigned = true;
            console.log(this.paper)
            this.paper.problems.forEach((problem) => {
                if (problem.choice <= -1) {
                    choiceAssigned = false;
                }
            })
            if (!choiceAssigned) {
                alert("您有题目未指定答案！")
                return
            }
            axios.post("/paper",
                this.paper).then(resp => {
                    let result = resp.data;
                    if (result.data >= 1) {
                        alert("保存成功！")
                    }
                })
        }
    },
    computed: {
        problem() {
            return this.paper.problems[this.problemIndex]
        }
    }
}
</script>

<style>
</style>