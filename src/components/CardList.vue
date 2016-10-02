<template lang="html">
    <div class="">
        <div class="row" v-for="group in cards">
            <div class="col-md-3" v-for="card in group" :key="card.id" v-if="card.imageUrl">
                <div class="card">
                    <img class="card-img" :src="card.imageUrl" :alt="card.name" width="100%"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['cards']
}
</script>

<style lang="css" scoped>
    .card {
        border: 6px solid rgba(0,0,0,0);
        background-color: #eaeaea;
        border-radius: 20px;
        overflow: hidden;
    }
</style>
