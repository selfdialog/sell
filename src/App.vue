<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab-wrapper">
            <tab :tabs="tabs"></tab>
        </div>
    </div>
</template>

<script>
    import qs from 'query-string'
    import VHeader from 'components/v-header/v-header'
    import Tab from 'components/tab/tab'
    import Goods from 'components/goods/goods'
    import Ratings from 'components/ratings/ratings'
    import Seller from 'components/seller/seller'
    import {getSeller} from "api";

    export default {
        name: 'app',
        components: {
            VHeader,
            Tab
        },
        data() {
            return {
                seller: {
                    id: qs.parse(location.search).id
                }
            }
        },
        computed: {
            tabs() {
                return [
                    {
                        label: '商品',
                        component: Goods,
                        data: {
                            seller: this.seller
                        }
                    },
                    {
                        label: '评论',
                        component: Ratings,
                        data: {
                            seller: this.seller
                        }
                    },
                    {
                        label: '商家',
                        component: Seller,
                        data: {
                            seller: this.seller
                        }
                    }
                ]
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

<style lang="stylus" scoped>
    #app
        .tab-wrapper
            position: fixed
            top: 136px
            left: 0
            right: 0
            bottom: 0
</style>
