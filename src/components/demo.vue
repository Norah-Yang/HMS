<template>
    <div>
        app
    </div>
</template>
<script>
export default {
    created(){
        this.axios({
            url:"/api",
            methods:"get"
        }).then((ok)=>{
            window.console.log(ok.data)
        })
    }
}
</script>
<style scoped>

</style>