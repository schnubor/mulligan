<template lang="html">
    <div class="pages row">
        <div class="col-md-12">
            <button class="btn btn-sm btn-secondary" disabled><i class="fa fa-chevron-left"></i> Prev</button>
            <button class="btn btn-sm btn-secondary">Next <i class="fa fa-chevron-right"></i></button>
            <span>Page {{ currentPage }} of {{ pageCount }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['pageCount', 'links'],
    data () {
        return {
            currentPage: 1
        }
    },
    computed: {
        nextPageUri () {

        },
        prevPageUri () {

        },
        lastPageUri () {

        }
    },
    methods: {},
    components: {}
}
</script>

<style lang="css" scoped>
    .pages span {
        padding-left: 10px;
    }

    .pages select {
        width: 90px;
    }
</style>
