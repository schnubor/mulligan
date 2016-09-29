<template lang="html">
    <div>
        <div class="jumbotron">
            <div class="container">
                <p class="lead text-xs-center">Quick find a card</p>
                <form>
                    <div class="row">
                        <div class="col-sm-12">
                            <input name="name" class="form-control-lg form-control" placeholder="Card name (optional)" v-model="name">
                        </div>
                    </div>

                    <div class="row m-t-1 labels">
                        <div class="col-sm-4">
                            <label for="">Mana costs:</label>
                        </div>
                        <div class="col-sm-2">
                            <label for="">Type:</label>
                        </div>
                        <div class="col-sm-4 offset-sm-2">
                            <label for="">Color:</label>
                        </div>
                    </div>
                    <div class="row p-b-2">
                        <div class="col-sm-2">
                            <select class="form-control form-control-sm " v-model="modifier">
                                <option value="gt">greater</option>
                                <option value="gte">greater or equal</option>
                                <option value="lt">lesser</option>
                                <option value="lte">lesser or equal</option>
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <input class="form-control-sm form-control" v-model="cmc" style="margin-top: 1px;">
                        </div>
                        <div class="col-sm-2">
                            <select class="form-control form-control-sm " v-model="type">
                                <option value="" disabled>Choose</option>
                                <option value="creature">Creature</option>
                                <option value="sorcery">Sorcery</option>
                                <option value="instant">Instant</option>
                                <option value="artifact">Artifact</option>
                                <option value="enchantment">Enchantment</option>
                                <option value="planeswalker">Planeswalker</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        <div class="col-sm-4 offset-sm-2">
                            <label class="form-check-inline">
                                <input class="form-check-input" type="checkbox" value="red" v-model="colors"> <span class="red circle"></span>
                            </label>
                            <label class="form-check-inline">
                                <input class="form-check-input" type="checkbox" value="blue" v-model="colors"> <span class="circle blue"></span>
                            </label>
                            <label class="form-check-inline">
                                <input class="form-check-input" type="checkbox" value="white" v-model="colors"> <span class="circle white"></span>
                            </label>
                            <label class="form-check-inline">
                                <input class="form-check-input" type="checkbox" value="green" v-model="colors"> <span class="circle green"></span>
                            </label>
                            <label class="form-check-inline">
                                <input class="form-check-input" type="checkbox" vvalue="black" v-model="colors"> <span class="circle black"></span>
                            </label>
                        </div>
                    </div>
                    <div class="row m-t-2 text-xs-center">
                        <button type="button" class="btn btn-lg btn-outline-secondary" @click="fetchCard">Find Cards</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-2" v-for="card in cards" :key="card.id">
                    <div class="card">
                        <img class="card-img" :src="card.imageUrl" :alt="card.name" width="100%"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import queryString from 'query-string'

export default {
    data () {
        return {
            cmc: 0,
            modifier: 'gte',
            name: '',
            type: '',
            colors: [],
            loading: false,
            cards: {}
        }
    },
    computed: {
        apiUrl () {
            let baseUrl = 'https://api.magicthegathering.io/v1/cards?'
            let params = {}

            params.name = this.name
            params.types = this.type
            params.colors = this.colors.join(',')
            params.cmc = this.modifier + this.cmc

            const stringified = queryString.stringify(params)
            return baseUrl + stringified
        }
    },
    methods: {
        fetchCard () {
            this.$http.get(this.apiUrl).then((response) => {
                console.log('Success!')
                this.cards = response.body.cards
            }, (error) => {
                console.warn('Error:', error)
            })
        }
    }
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
        margin-bottom: 30px;
    }

    label {
        color: white;
        font-weight: 100;
        letter-spacing: 2px;
    }

    .circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        border: 2px solid white;
        margin-top: 2px;
    }

    .circle.red { background-color: rgb(221, 77, 77); }
    .circle.blue { background-color: rgb(77, 169, 221); }
    .circle.white { background-color: rgb(241, 228, 181); }
    .circle.green { background-color: rgb(82, 161, 92); }
    .circle.black { background-color: rgb(57, 60, 62); }

    .card {
        border: 1px solid rgba(0,0,0,0);
        background-color: #eaeaea;
        border-radius: 8px;
    }
</style>
