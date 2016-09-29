<template lang="html">
    <div class="container">
        <h2>Card</h2>
        <p>
            ID: {{ $route.params.id }}
        </p>
        <button type="button" class="btn btn-primary" @click="searchCard">Fetch Card</button>
        <hr>
        <div class="row">
            <div class="col-md-3" v-for="card in cards" :key="card.id">
                <div class="card">
                    <img class="card-img" :src="card.imageUrl" :alt="card.name" width="100%"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cards: {}
        }
    },
    computed: {},
    methods: {},
    components: {}
}
</script>

<style lang="css" scoped>
    
</style>
