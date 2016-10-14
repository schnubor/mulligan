<template lang="html">
    <div>
        <div class="jumbotron">
            <div class="container">
                <p class="lead text-xs-center">Quick search</p>
                <form>
                    <div class="row quicksearch">
                        <div class="col-sm-12">
                            <input id="quicksearchinput" class="form-control-lg form-control" placeholder="Card name (optional)" v-model="name">
                        </div>
                    </div>
                    <div class="p-b-2">
                        <div class="col-md-12 qswrapper">
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <select class="form-control form-control-sm" v-model="set">
                                                <option value="">all sets</option>
                                                <option :value="set.code" v-for="set in setsReverted">{{ set.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <select class="form-control form-control-sm " v-model="type">
                                        <option value="">all types</option>
                                        <option value="instant">Instant</option>
                                        <option value="sorcery">Sorcery</option>
                                        <option value="artifact">Artifact</option>
                                        <option value="creature">Creature</option>
                                        <option value="enchantment">Enchantment</option>
                                        <option value="land">Land</option>
                                        <option value="planeswalker">Planeswalker</option>
                                    </select>
                                </div>

                                <div class="col-md-2">
                                    <select class="form-control form-control-sm " v-model="rarity">
                                        <option value="">all rarities</option>
                                        <option value="Mythic Rare">Mythic</option>
                                        <option value="Rare">Rare</option>
                                        <option value="Uncommon">Uncommon</option>
                                        <option value="Common">Common</option>
                                    </select>
                                </div>
                                <div class="col-md-4">
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
                    </div>
                    <div class="row m-t-2 text-xs-center">
                        <button type="submit" class="btn btn-lg btn-outline-secondary" @click.stop.prevent="triggerNewSearch"><i class="fa fa-search"></i> Find Cards</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Loading -->
        <div class="container" v-if="!fetched && !error && !noresults && !toomanyresults" key="loading">
            <h1 class="text-xs-center" v-if="!loading">Search. Build. Play.</h1>
            <spinner v-if="loading"></spinner>
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

        <!-- Too many results -->
        <div class="container" v-if="toomanyresults" key="noresults">
            <h1 class="error text-xs-center">
                (づ￣ ³￣)づ <br><br>
                <small>
                    Found 1000+ cards. <br>
                    Try adjusting the filters.
                </small>
            </h1>
        </div>

        <!-- Cards -->
        <div class="container" v-if="fetched" key="fetched">
            <!-- Filter -->
            <div class="row">
                <div class="col-md-3 form-inline">
                    <span>Sort by</span>
                    <select class="form-control form-control-sm" v-model="sorting">
                        <option value="name">Name</option>
                        <option value="cmc">CMC</option>
                    </select>
                    <button class="btn btn-sm btn-secondary" @click="order *= -1"><i class="fa fa-arrows-v"></i> Reverse</button>
                </div>
                <div class="col-md-9">
                    <pagination v-if="totalPages > 1" :page="pagination.currentPage" :pageCount="totalPages" @nextPage="paginate('next')" @prevPage="paginate('prev')"></pagination>
                </div>
            </div>
            <hr>

            <!-- Card list -->
            <cardList :cards="chunkedPage"></cardList>

            <!-- Pagination -->
            <div v-if="totalPages > 1">
                <hr>
                <pagination :page="pagination.currentPage" :pageCount="totalPages" @nextPage="paginate('next')" @prevPage="paginate('prev')"></pagination>
            </div>
        </div>
    </div>
</template>

<script>
import queryString from 'query-string'
import Pagination from '../components/Pagination.vue'
import CardList from '../components/CardList.vue'
import Spinner from '../components/Spinner.vue'
import _ from 'lodash'

export default {
    data () {
        return {
            type: '',
            name: '',
            set: '',
            rarity: '',
            colors: [],
            cards: [],
            sets: [],
            fetched: false,
            loading: false,
            error: false,
            noresults: false,
            toomanyresults: false,
            sorting: 'name',
            order: 1,
            pagination: {
                currentPage: 1,
                pageSize: 32
            }
        }
    },
    computed: {
        sortedCards () {
            if (this.order === 1) {
                return _.sortBy(this.cards, this.sorting)
            } else {
                return _.sortBy(this.cards, this.sorting).reverse()
            }
        },
        searchRouteParams () {
            let params = {}

            if (this.name) params.name = this.name
            if (this.set) params.set = this.set
            if (this.colors.length) params.colors = this.colors.join(',')
            if (this.type) params.types = this.type
            if (this.rarity) params.rarity = this.rarity
            params.page = this.pagination.currentPage

            return params
        },
        totalPages () {
            return Math.ceil(this.cards.length / this.pagination.pageSize)
        },
        cardPage () {
            let resultCount = this.cards.length
            let index = 0
            let currentPage = this.pagination.currentPage - 1

            if (resultCount !== 0) {
                if (this.pagination.currentPage >= this.totalPages) {
                    currentPage = this.totalPages - 1
                }
            } else {
                currentPage = 0
            }

            index = currentPage * this.pagination.pageSize
            return this.sortedCards.slice(index, index + this.pagination.pageSize)
        },
        chunkedPage () {
            return _.chunk(this.cardPage, 4)
        },
        setsReverted () {
            return this.sets.reverse()
        }
    },
    mounted () {
        // Fetch all the sets
        this.fetchSets()
    },
    methods: {
        fetchPage (page) {
            let baseUrl = 'https://api.magicthegathering.io/v1/cards?'
            let params = {}

            if (this.name) params.name = this.name
            if (this.set) params.set = this.set
            if (this.type) params.types = this.type
            if (this.rarity) params.rarity = this.rarity
            if (this.colors.length && this.type !== 'land') params.colors = this.colors.join(',')

            params.pageSize = this.pagination.pageSize
            params.page = page

            let searchUri = baseUrl + queryString.stringify(params)

            this.$http.get(searchUri).then((response) => {
                // Get total count
                let total = response.headers.get('Total-Count')
                let totalPages = Math.ceil(total / this.pagination.pageSize)

                // Check for
                if (total < 1000) {
                    // Fill cards
                    if (response.body.cards.length) {
                        for (let card of response.body.cards) {
                            if (card.imageUrl) this.cards.push(card)
                        }
                    } else {
                        this.noresults = true
                    }

                    // Fetch next page if necessary
                    if (page < totalPages) {
                        page++
                        this.fetchPage(page)
                    } else {
                        this.fetched = true
                        this.loading = false
                    }
                } else {
                    this.toomanyresults = true
                    this.loading = false
                }
            }, (error) => {
                this.loading = false
                this.error = true
                console.warn(error)
            })
        },
        triggerNewSearch () {
            // reset pagination and results
            this.pagination.currentPage = 1
            this.cards = []
            document.getElementById('quicksearchinput').blur()

            // push URL to browser history
            this.$router.push({path: '/', query: this.searchRouteParams})
            this.search()
        },
        search () {
            this.toomanyresults = false
            this.fetched = false
            this.loading = true
            this.noresults = false

            this.fetchPage(1)
        },
        paginate (direction) {
            if (direction === 'next') {
                this.pagination.currentPage++
                this.$router.push({path: '/', query: this.searchRouteParams})
            } else {
                this.pagination.currentPage--
            }
            // Update url
            this.$router.push({path: '/', query: this.searchRouteParams})
        },
        // Fetch all sets
        fetchSets () {
            this.$http.get('https://api.magicthegathering.io/v1/sets').then((response) => {
                // Fill sets
                this.sets = response.body.sets
                if (this.$route.query.set) this.set = this.$route.query.set

                // Set Filters according to URL and trigger search
                if (!_.isEmpty(this.$route.query)) {
                    if (this.$route.query.name) this.name = this.$route.query.name
                    if (this.$route.query.set) this.set = this.$route.query.set
                    if (this.$route.query.colors) this.colors = this.$route.query.colors.split(',')
                    if (this.$route.query.type) this.type = this.$route.query.type
                    if (this.$route.query.rarity) this.rarity = this.$route.query.rarity
                    this.pagination.currentPage = parseInt(this.$route.query.page)
                    // trigger initial search
                    this.search()
                }
            }, (error) => {
                console.warn(error)
            })
        }
    },
    components: {
        cardList: CardList,
        pagination: Pagination,
        spinner: Spinner
    }
}
</script>

<style lang="css" scoped>
    .jumbotron {
        background-image: url('../assets/images/bg1.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: center;
        border-radius: 0;
        padding: 2rem 0;
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
        display: inline-block;
        line-height: 18px;
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

    .jumbotron input, .jumbotron select {
        font-weight: 200;
        opacity: 0.8;
        transition: .2s all;
    }

    .jumbotron input:focus, .jumbotron select:focus {
        border-color: #fff;
        opacity: 1;
    }

    .qswrapper {
        background-color: rgba(20, 20, 20, 0.7);
        padding: 15px;
        border-radius: 0.25rem;
        float: none;
    }

    .circle.red { background-color: rgb(221, 77, 77); }
    .circle.blue { background-color: rgb(77, 169, 221); }
    .circle.white { background-color: rgb(241, 228, 181); }
    .circle.green { background-color: rgb(82, 161, 92); }
    .circle.black { background-color: rgb(57, 60, 62); }

    @media screen and (max-width: 544px) {
        .labels {
            display: none;
        }

        #quicksearchinput {
            margin-bottom: 15px;
        }
    }
</style>
