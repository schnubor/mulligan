<template lang="html">
    <div class="card" :class="borderColor">
        <router-link :to="{ name: 'card', params: { id: card.multiverseid }}">
            <img class="card-img" :src="card.imageUrl" :alt="card.name" width="100%"/>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['card', 'rarity'],
    data () {
        return {}
    },
    computed: {
        borderColor () {
            switch (this.rarity) {
            case 'Mythic Rare': return 'mythic'
            case 'Rare': return 'rare'
            case 'Uncommon': return 'uncommon'
            default: return 'common'
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .card {
        border: 6px solid rgba(0,0,0,0);
        border-radius: 20px;
        overflow: hidden;
    }

    .common { background-color: #2F2F2F; }
    .uncommon { background-color: #C4C8CC; }
    .rare { background-color: #E0C596; }
    .mythic { background-color: #E09475; }
</style>
