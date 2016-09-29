<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-light bg-faded">
        <div class="container" id="exCollapsingNavbar2">
            <router-link class="navbar-brand" to="/">Mulligan</router-link>
        </div>
    </nav>

    <router-view style="margin-top: 54px;"></router-view>

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
