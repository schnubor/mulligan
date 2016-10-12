<template lang="html">
    <div>
        <div class="row" v-for="group in cards">
            <div class="col-md-3" v-for="card in group" :key="card.id" v-if="card.imageUrl">
                <card :card="card" :rarity="card.rarity"></card>
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card.vue'

export default {
    props: ['cards'],
    components: {
        card: Card
    }
}
</script>

<style lang="css" scoped>

</style>
