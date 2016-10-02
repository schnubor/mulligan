<template lang="html">
    <div class="container">
        <h2>{{ card.name }}</h2>
        <p>
            ID: {{ $route.params.id }}
        </p>
        <img :src="card.imageUrl" :alt="card.name" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: true,
            error: false,
            card: {}
        }
    },
    mounted () {
        this.fetchCard()
    },
    computed: {},
    methods: {
        fetchCard () {
            let uri = 'https://api.magicthegathering.io/v1/cards/' + this.$route.params.id

            this.$http.get(uri).then((response) => {
                this.loading = false

                // Show card
                this.card = response.body.card
            }, (error) => {
                this.error = true
                console.warn(error)
            })
        }
    },
    components: {}
}
</script>

<style lang="css" scoped>

</style>
