<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
        <div class="container" id="exCollapsingNavbar2">
            <router-link class="navbar-brand" to="/">Brand</router-link>
            <ul class="nav navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/user/schnubor">User</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/card/1">Card</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/deck/2">Deck</router-link>
                </li>
            </ul>
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
