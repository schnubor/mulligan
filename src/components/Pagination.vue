<template lang="html">
    <div class="pages">
        <span>Page {{ currentPage }} of {{ pageCount }}</span>
        <button class="btn btn-sm btn-secondary" @click="prevPage" :disabled="disablePrev"><i class="fa fa-chevron-left"></i> Prev</button>
        <button class="btn btn-sm btn-secondary" @click="nextPage" :disabled="disableNext">Next <i class="fa fa-chevron-right"></i></button>
    </div>
</template>

<script>
export default {
    props: ['pageCount', 'page'],
    data () {
        return {}
    },
    computed: {
        currentPage () {
            return this.page
        },
        disableNext () {
            if (this.page === this.pageCount) return true
            return false
        },
        disablePrev () {
            if (this.page === 1) return true
            return false
        }
    },
    methods: {
        nextPage () {
            this.$emit('nextPage')
        },
        prevPage () {
            this.$emit('prevPage')
        }
    },
    components: {}
}
</script>

<style lang="css" scoped>
    .pages {
        float: right;
    }

    .pages span {
        padding-left: 10px;
    }

    .pages select {
        width: 90px;
    }
</style>
