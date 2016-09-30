<template lang="html">
    <div class="container">
        <div class="row p-b-2">
            <div class="col-sm-2">
                <select class="form-control form-control-sm " v-model="modifier">
                    <option value="gt">greater</option>
                    <option value="gte">greater or equal</option>
                    <option value="lt">lesser</option>
                    <option value="lte">lesser or equal</option>
                </select>
            </div>
            <div class="col-sm-2">
                <input class="form-control-sm form-control" v-model="cmc" style="margin-top: 1px;">
            </div>
            <div class="col-sm-2">
                <select class="form-control form-control-sm " v-model="type">
                    <option value="" disabled>Choose</option>
                    <option value="creature">Creature</option>
                    <option value="sorcery">Sorcery</option>
                    <option value="instant">Instant</option>
                    <option value="artifact">Artifact</option>
                    <option value="enchantment">Enchantment</option>
                    <option value="planeswalker">Planeswalker</option>
                    <option value="land">Land</option>
                </select>
            </div>
            <div class="col-sm-4 offset-sm-2">
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
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="css" scoped>
    .circle.red { background-color: rgb(221, 77, 77); }
    .circle.blue { background-color: rgb(77, 169, 221); }
    .circle.white { background-color: rgb(241, 228, 181); }
    .circle.green { background-color: rgb(82, 161, 92); }
    .circle.black { background-color: rgb(57, 60, 62); }
</style>
