<template lang="html">
    <div class="card" :class="borderColor">
        <div class="cardcontent">
            <router-link :to="{ name: 'card', params: { id: card.multiverseid }}">
                <img class="card-img" :src="card.imageUrl" :alt="card.name" width="100%"/>
            </router-link>
        </div>
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

    .card:before {
        display: block;
        content: "";
        width: 100%;
        padding-top: 139.6825%;
    }

    .card > .cardcontent {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .common { background-color: #2F2F2F; }
    .uncommon { background-color: #C4C8CC; }
    .rare { background-color: #E0C596; }
    .mythic { background-color: #E09475; }
</style>
