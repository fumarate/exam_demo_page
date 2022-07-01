<template>
        <StudentView v-if="'sid' in user" :user="user"></StudentView>
        <TeacherView v-else :user="user"></TeacherView>
</template>

<script>
export default {
    props: ['user']
}
</script>

<style>

</style>