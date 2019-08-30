<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
    </div>
</template>

<script>
    import VHeader from 'components/v-header/v-header'
    import {getSeller} from "@/api";

    export default {
        name: 'app',
        components: {
            VHeader
        },
        data() {
            return {
                seller: {
                    // id: qs.parse(location.search).id
                }
            }
        },
        created() {
            this._getSeller();
        },
        methods: {
            _getSeller() {
                getSeller().then(seller => {
                    // eslint-disable-next-line no-console
                    console.log(seller);
                    this.seller = seller;
                })
            }
        }
    }
</script>

<style>
    /*#app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }*/
</style>
