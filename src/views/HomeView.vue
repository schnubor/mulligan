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
                                            <option value="">equal</option>
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
                                            <input class="form-check-input" type="checkbox" value="red" v-model="colors"> <span class="red circle"><i class="ms ms-r"></i></span>
                                        </label>
                                        <label class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" value="blue" v-model="colors"> <span class="circle blue"><i class="ms ms-u"></i></span>
                                        </label>
                                        <label class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" value="white" v-model="colors"> <span class="circle white"><i class="ms ms-w"></i></span>
                                        </label>
                                        <label class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" value="green" v-model="colors"> <span class="circle green"><i class="ms ms-g"></i></span>
                                        </label>
                                        <label class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" value="black" v-model="colors"> <span class="circle black"><i class="ms ms-b"></i></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row m-t-2 text-xs-center">
                        <button type="submit" class="btn btn-lg btn-outline-secondary" @click.stop.prevent="newSearch"><i class="fa fa-search"></i> Find Cards</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Loading -->
        <div class="container" v-if="!fetched && !error && !noresults" key="loading">
            <h1 class="text-xs-center">{{ loading ? "Loading ..." : "Search. Build. Play." }}</h1>
        </div>

        <!-- Error -->
        <div class="container" v-if="error" key="error">
            <h1 class="error text-xs-center">
                ლ(ಠ益ಠლ) <br>
                <small>An error occured ...</small>
            </h1>
        </div>

        <!-- No results -->
        <div class="container" v-if="noresults" key="noresults">
            <h1 class="error text-xs-center">
                ಠ_ಠ <br>
                <small>No results.</small>
            </h1>
        </div>

        <!-- Cards -->
        <div class="container" v-if="fetched" key="fetched">
            <!-- Pagination -->
            <div v-if="pageCount > 1">
                <pagination :page="pagination.page" :pageCount="pageCount" @nextPage="paginate('next')" @prevPage="paginate('prev')"></pagination>
                <hr>
            </div>

            <!-- Card list -->
            <cardList :cards="chunkedCards"></cardList>

            <!-- Pagination -->
            <div v-if="pageCount > 1">
                <hr>
                <pagination :page="pagination.page" :pageCount="pageCount" @nextPage="paginate('next')" @prevPage="paginate('prev')"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import queryString from 'query-string'
import Pagination from '../components/Pagination.vue'
import CardList from '../components/CardList.vue'
import _ from 'lodash'

export default {
    data () {
        return {
            cmc: 0,
            modifier: 'gte',
            name: '',
            colors: [],
            cards: [],
            fetched: false,
            loading: false,
            error: false,
            noresults: false,
            pagination: {
                page: 1,
                pageSize: 32,
                totalResults: 0,
                link: ''
            }
        }
    },
    computed: {
        searchUrl () {
            let baseUrl = 'https://api.magicthegathering.io/v1/cards?'
            let params = {}

            params.name = this.name
            params.colors = this.colors.join(',')
            params.cmc = this.modifier + this.cmc
            params.page = this.pagination.page
            params.pageSize = this.pagination.pageSize

            const stringified = queryString.stringify(params)
            return baseUrl + stringified
        },
        searchRouteParams () {
            let params = {}

            params.name = this.name
            params.colors = this.colors.join(',')
            params.cmc = this.cmc
            params.modifier = this.modifier
            params.page = this.pagination.page
            params.pageSize = this.pagination.pageSize

            return params
        },
        chunkedCards () {
            return _.chunk(this.cards, 4)
        },
        pageCount () {
            return Math.ceil(this.pagination.totalResults / this.pagination.pageSize)
        }
    },
    mounted () {
        if (!_.isEmpty(this.$route.query)) {
            this.name = this.$route.query.name
            if (this.$route.query.colors) this.colors = this.$route.query.colors.split(',')
            this.cmc = this.$route.query.cmc
            this.modifier = this.$route.query.modifier
            this.pagination.page = this.$route.query.page
            console.log(this.pagination.page)
            this.search()
        }
    },
    methods: {
        fetchPage (uri) {
            this.cards = []

            this.$http.get(uri).then((response) => {
                this.loading = false

                // Pagination
                this.pagination.link = response.headers.get('link')
                this.pagination.totalResults = response.headers.get('total-count')
                // Show cards
                if (response.body.cards.length) {
                    for (let card of response.body.cards) {
                        if (card.imageUrl) this.cards.push(card)
                    }
                    this.fetched = true
                } else {
                    this.noresults = true
                }
            }, (error) => {
                this.loading = false
                this.error = true
                console.warn(error)
            })
        },
        newSearch () {
            // reset pagination and results
            this.pagination.page = 1
            this.cards = []
            document.getElementById('quicksearchinput').blur()

            // push URL to history
            this.$router.push({path: '/', query: this.searchRouteParams})
            this.search()
        },
        search () {
            this.fetched = false
            this.loading = true
            this.noresults = false

            this.fetchPage(this.searchUrl)
        },
        paginate (direction) {
            if (direction === 'next') {
                this.pagination.page++
                this.$router.push({path: '/', query: this.searchRouteParams})
                this.fetchPage(this.searchUrl)
            } else {
                this.pagination.page--
                this.$router.push({path: '/', query: this.searchRouteParams})
                this.fetchPage(this.searchUrl)
            }
        }
    },
    components: {
        cardList: CardList,
        pagination: Pagination
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

    h1 small {
        text-transform: none;
        font-size: 12px;
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
        line-height: 13px;
        padding-left: 2px;
        font-size: 12px;
        text-align: center;
        vertical-align: top;
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
