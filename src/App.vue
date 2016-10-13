<template>
<div>
    <!-- Navigaton -->
    <nav class="navbar navbar-top navbar-light bg-faded">
        <div class="container" id="exCollapsingNavbar2">
            <a class="navbar-brand" href="/"><i class="fa fa-retweet"></i> Mulligan</a>
        </div>
    </nav>

    <!-- Content -->
    <router-view></router-view>

    <!-- Footer -->
    <footer class="m-t-2 main-footer">
        <div class="container">
            <span class="small pull-left">
                Made with <a href="http://vuejs.org" target="_blank">vue</a> and <a href="http://magicthegathering.io" target="_blank">magicthegathering.io</a>
            </span>
            <span class="small pull-right">
                <a href="http://twitter.com/schnubor" target="_blank"><i class="fa fa-twitter"></i></a>
                <a href="http://github.com/schnubor/mulligan" target="_blank" class="p-l-1"><i class="fa fa-github"></i></a>
            </span>
        </div>
    </footer>
</div>
</template>

<style>
body {
    font-family: Helvetica, sans-serif;
}

.main-footer {
    padding: 20px 0;
    background-color: #f7f7f9;
}

.main-footer span {
    display: inline-block;
    font-weight: 100;
    color: #c8c8c8;
}

.main-footer a {
    color: #949494;
    transition: 0.2s all;
}

.main-footer a:hover {
    color: #202020;
}
</style>
