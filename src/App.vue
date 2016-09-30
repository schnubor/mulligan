<template>
<div>
    <nav class="navbar navbar-top navbar-light bg-faded">
        <div class="container" id="exCollapsingNavbar2">
            <router-link class="navbar-brand" to="/">Mulligan</router-link>
        </div>
    </nav>

    <router-view ></router-view>

</div>
</template>

<script>
export default {
    data () {
        return {
            msg: 'Hello Vue!'
        }
    }
}
</script>

<style>
body {
    font-family: Helvetica, sans-serif;
}
</style>
