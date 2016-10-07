<template lang="html">
    <div class="bg">
        <div class="container">
            <div class="row p-t-2">
                <div class="col-md-3">
                    <img :src="card.imageUrl" :alt="card.name" :class="borderColor" />
                    <small class="artist" v-if="card.artist">Artist: {{ card.artist }}</small>
                </div>
                <div class="col-md-9">
                    <h2 v-if="card.name">
                        {{ card.name }} <br>
                        <small v-if="card.type">{{ card.type }}</small>
                    </h2>
                    <p class="lead m-t-2" v-if="card.text" v-html="rawText"></p>
                    <em v-if="card.flavor">"{{ cleanFlavor }}"</em>

                    <p class="h4 m-t-2" v-if="card.power && card.toughness">
                        <span class="p-r-2"><i class="fa fa-gavel"></i> {{ card.power }}</span>
                        <span class="p-r-2"><i class="fa fa-shield"></i> {{ card.toughness }}</span>
                    </p>

                    <div v-if="card.legalities">
                        <hr>
                        <h5>Legalities</h5>
                        <legality v-for="legality in card.legalities" :format="legality.format" :legality="legality.legality"></legality>
                    </div>
                    <div class="rulings" v-if="card.rulings">
                        <hr>
                        <h5>Rulings</h5>
                        <blockquote class="blockquote" v-for="ruling in card.rulings">
                            <p class="m-b-0">{{ ruling.text }}</p>
                            <footer class="blockquote-footer">{{ ruling.date }}</footer>
                        </blockquote>
                    </div>
                    <hr>
                    <small>Set: {{ card.setName }}, Multiverse ID: {{ card.multiverseid }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Legality from '../components/Legality.vue'

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
    computed: {
        cleanFlavor () {
            if (this.card.flavor) {
                return this.card.flavor.replace(/["]+/g, '')
            } else {
                return ''
            }
        },
        borderColor () {
            switch (this.card.rarity) {
            case 'Mythic Rare': return 'mythic'
            case 'Rare': return 'rare'
            case 'Uncommon': return 'uncommon'
            default: return 'common'
            }
        },
        rawText () {
            let text = this.card.text
            text = text.replace(/\n/g, '<br />')
            text = text.replace(/\{T\}/g, '<i class="ms ms-tap ms-cost"></i>')
            text = text.replace(/\{R\}/g, '<i class="ms ms-r ms-cost"></i>')
            text = text.replace(/\{U\}/g, '<i class="ms ms-u ms-cost"></i>')
            text = text.replace(/\{G\}/g, '<i class="ms ms-g ms-cost"></i>')
            text = text.replace(/\{W\}/g, '<i class="ms ms-w ms-cost"></i>')
            text = text.replace(/\{B\}/g, '<i class="ms ms-b ms-cost"></i>')
            text = text.replace(/\{C\}/g, '<i class="ms ms-c ms-cost"></i>')
            text = text.replace(/\{S\}/g, '<i class="ms ms-s ms-cost"></i>')
            text = text.replace(/\{B\/P\}/g, '<i class="ms ms-p ms-cost"></i>')
            text = text.replace(/\{E\}/g, '<i class="ms ms-e"></i>')
            text = text.replace(/\{(\d)\}/g, '<i class="ms ms-$1 ms-cost"></i>')
            return text
        }
    },
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
    components: {
        legality: Legality
    }
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

    .rulings blockquote p {
        font-size: 16px;
    }

    .rulings .blockquote-footer {
        font-size: 12px;
    }

    small {
        font-size: 14px;
        color: #c8c8c8;
    }

    small.artist {
        padding-left: 20px;
    }

    img {
        border: 6px solid rgba(0,0,0,0);
        background-color: #eaeaea;
        border-radius: 20px;
        width: 100%;
    }

    .common { background-color: #eaeaea; }
    .uncommon { background-color: #C4C8CC; }
    .rare { background-color: #E0C596; }
    .mythic { background-color: #E09475; }

    em {
        font-family: serif;
    }
</style>
