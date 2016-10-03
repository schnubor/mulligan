<template lang="html">
    <h6 class="legality">
        <span class="tag" :class="legalityClass">{{ format }}</span>
    </h6>
</template>

<script>
export default {
    props: ['legality', 'format'],
    data () {
        return {}
    },
    computed: {
        legalityClass () {
            switch (this.legality) {
            case 'Legal': return 'tag-success'
            case 'Restricted': return 'tag-restricted'
            case 'Banned': return 'tag-danger'
            default: return 'tag-default'
            }
        }
    },
    methods: {},
    components: {}
}
</script>

<style lang="css">
</style>
