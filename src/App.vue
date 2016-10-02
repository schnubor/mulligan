<template>
<div>
    <nav class="navbar navbar-top navbar-light bg-faded">
        <div class="container" id="exCollapsingNavbar2">
            <router-link class="navbar-brand" to="/">Mulligan</router-link>
        </div>
    </nav>

    <router-view ></router-view>

    <footer class="m-t-2">
        <div class="container">
            <span class="small pull-left">
                Build by <a href="http://twitter.com/schnubor" target="_blank">schnubor</a> with <a href="http://vuejs.org" target="_blank">Vue.js 2.0</a>
            </span>
            <span class="small pull-right">
                <a href="http://github.com/schnubor/mulligan" target="_blank"><i class="fa fa-github"></i></a>
            </span>
        </div>
    </footer>
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

footer {
    padding: 20px 0;
    background-color: #f7f7f9;
}

footer span {
    display: inline-block;
    font-weight: 100;
    color: #c8c8c8;
}

footer a {
    color: #949494;
    transition: 0.2s all;
}

footer a:hover {
    color: #202020;
}
</style>
