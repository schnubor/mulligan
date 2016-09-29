<template lang="html">
    <div class="jumbotron">
        <div class="container text-xs-center">
            <p class="lead">Find your card</p>
            <form>
                <div class="form-group">
                    <input name="name" class="form-control-lg form-control" placeholder="Card name" v-model="name">
                </div>
                <div class="form-group">
                    <button type="button" class="btn btn-lg btn-outline-secondary">Find Cards</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: ''
        }
    },
    computed: {},
    ready () {},
    attached () {},
    methods: {},
    components: {}
}
</script>

<style lang="css" scoped>
    .jumbotron {
        background-image: url('../assets/images/bg1.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 0;
    }

    .lead {
        color: white;
        font-size: 2em;
        text-transform: uppercase;
        font-weight: 100;
        letter-spacing: 6px;
    }
</style>
