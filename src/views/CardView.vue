<template lang="html">
    <div class="bg">
        <div class="container">
            <div class="row p-t-2">
                <div class="col-md-3">
                    <img :src="card.imageUrl" :alt="card.name" />
                    <small>Artist {{ card.artist }}</small>

                </div>
                <div class="col-md-9">
                    <h2>
                        {{ card.name }} <br>
                        <small>{{ card.type }}</small>
                    </h2>
                    <p class="lead m-t-2">
                        {{ card.text }} <br>
                    </p>
                    <em>"{{ card.flavor }}"</em>
                    <hr>
                    <h5>Legalities</h5>
                    <h6 class="legality" v-for="legality in card.legalities">
                        <span class="tag tag-default" :class="">{{ legality.format }}</span>
                    </h6>
                    <hr>
                    <small>Multiverse ID: {{ card.multiverseid }}</small>
                </div>
            </div>
        </div>
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
    h2 {
        margin-bottom: 0;
    }

    .legality {
        display: inline-block;
        margin-right: 10px;
    }

    small {
        font-size: 14px;
        color: #c8c8c8;
    }

    img {
        border: 6px solid rgba(0,0,0,0);
        background-color: #eaeaea;
        border-radius: 20px;
        width: 100%;
    }

    em {
        font-family: serif;
    }
</style>
