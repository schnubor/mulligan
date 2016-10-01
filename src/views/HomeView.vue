<template lang="html">
    <div>
        <div class="jumbotron">
            <div class="container">
                <p class="lead text-xs-center">Quick search</p>
                <form>
                    <div class="row quicksearch">
                        <div class="col-sm-12">
                            <input id="quicksearchinput" class="form-control-lg form-control" placeholder="Card name" v-model="name">
                        </div>
                    </div>
                    <div class="row m-t-1 labels">
                        <div class="col-sm-4">
                            <label>Mana costs:</label>
                        </div>
                        <div class="col-sm-4 offset-sm-4">
                            <label for="">Color:</label>
                        </div>
                    </div>
                    <div class="row p-b-2">
                        <div class="col-md-12">
                            <div class="col-md-4 qswrapper">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <select class="form-control form-control-sm " v-model="modifier">
                                            <option value="gt">greater</option>
                                            <option value="gte">greater or equal</option>
                                            <option value="lt">lesser</option>
                                            <option value="lte">lesser or equal</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-6">
                                        <input class="form-control-sm form-control" v-model="cmc" style="margin-top: 1px;">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 offset-sm-4 qswrapper">
                                <div class="row">
                                    <div class="col-sm-12">
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
                                            <input class="form-check-input" type="checkbox" value="black" v-model="colors"> <span class="circle black"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="row m-t-2 text-xs-center">
                        <button type="submit" class="btn btn-lg btn-outline-secondary" @click.stop.prevent="search"><i class="fa fa-search"></i> Find Cards</button>
                    </div>
                </form>
            </div>
        </div>

        <transition name="fade" mode="out-in">
            <div>
                <div class="container" v-if="!fetched && !error">
                    <h1 class="text-xs-center">{{ loading ? "Loading ..." : "Search. Build. Play." }}</h1>
                </div>
                <div class="container">
                    <h1 class="error text-xs-center">-_-;</h1>
                </div>
                <div class="container" v-if="fetched">
                    <!-- Pagination -->
                    <div class="pages row">
                        <div class="col-md-12">
                            <button class="btn btn-sm btn-secondary" disabled>Prev</button>
                            <button class="btn btn-sm btn-secondary">Next</button>
                            <span>Page 1 of 2</span>
                            <hr>
                        </div>
                    </div>
                    <!-- Card list -->
                    <cardList :cards="cards"></cardList>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import queryString from 'query-string'
import CardList from '../components/CardList.vue'

export default {
    data () {
        return {
            cmc: 0,
            modifier: 'gte',
            name: '',
            type: '',
            colors: [],
            cards: {},
            fetched: false,
            loading: false,
            error: false,
            pagination: {
                total: 0,
                page: 1,
                pageSize: 50,
                nextPageUri: '',
                prevPageUri: '',
                lastPageUri: ''
            }
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
            params.pageSize = this.pagination.pageSize

            const stringified = queryString.stringify(params)
            return baseUrl + stringified
        },
        pages () {
            return Math.ceil(this.total / this.pageSize)
        }
    },
    methods: {
        search () {
            this.fetched = false
            this.loading = true

            document.getElementById('quicksearchinput').blur()
            this.$http.get(this.apiUrl).then((response) => {
                console.log('Success!')
                this.fetched = true
                this.loading = false
                // Pagination
                console.log(response)
                this.pagination.total = response.headers.get('total-count')
                let link = response.headers.get('link')
                console.log(link)
                this.cards = response.body.cards
            }, (error) => {
                this.loading = false
                this.error = true

                console.warn('Error:', error)
            })
        }
    },
    components: {
        cardList: CardList
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

    .jumbotron .lead {
        color: white;
        font-size: 2em;
        text-transform: uppercase;
        font-weight: 100;
        letter-spacing: 6px;
        margin-bottom: 30px;
    }

    h1 {
        font-weight: 200;
        opacity: .3;
        text-transform: uppercase;
        letter-spacing: 4px;
        margin: 100px 0;
    }

    h1.error {
        color: rgb(162, 68, 69);
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

    .btn.btn-outline-secondary {
        color: white;
        border: 2px solid white;
        font-weight: 300;
        opacity: 0.8;
        transition: .2s all;
        border-radius: 2rem;
    }

    .btn.btn-outline-secondary:active, .btn.btn-outline-secondary:focus {
        background-color: transparent;
        outline: none;
    }

    .btn.btn-outline-secondary:hover {
        opacity: 1;
    }

    .btn.btn-outline-secondary:hover {
        color: black;
        background-color: white;
    }

    .jumbotron input, select {
        font-weight: 200;
        opacity: 0.8;
        transition: .2s all;
    }

    .jumbotron input:focus, select:focus {
        border-color: #fff;
        opacity: 1;
    }

    .qswrapper {
        background-color: rgba(20, 20, 20, 0.7);
        padding: 15px;
        border-radius: 0.25rem;
    }

    .circle.red { background-color: rgb(221, 77, 77); }
    .circle.blue { background-color: rgb(77, 169, 221); }
    .circle.white { background-color: rgb(241, 228, 181); }
    .circle.green { background-color: rgb(82, 161, 92); }
    .circle.black { background-color: rgb(57, 60, 62); }
</style>
