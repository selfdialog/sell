<template>
    <div class="tab">
        <cube-tab-bar
                :useTransition=false
                :showSlider=true
                v-model="selectedLabel"
                :data="tabs"
                ref="tabBar"
                class="border-bottom-1px"
        >
        </cube-tab-bar>
        <div class="slide-wrapper">
            <cube-slide
                    :loop=false
                    :auto-play=false
                    :show-dots=false
                    :initial-index="index"
                    ref="slide"
                    :options="slideOptions"
                    @scroll="onScroll"
                    @change="onChange"
            >
                <cube-slide-item v-for="(tab,index) in tabs" :key="index">
                    <component ref="component" :is="tab.component" :data="tab.data"></component>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
    import {saveToLocal, loadFromLocal} from 'common/js/storage'

    export default {
        name: 'tab',
        props: {
            tabs: {
                type: Array,
                default() {
                    return []
                }
            },
            initialIndex: {
                type: Number,
                default: 0
            },
            id: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                index: this.initialIndex,
                slideOptions: {
                    listenScroll: true,
                    probeType: 3,
                    directionLockThreshold: 0
                },
            }
        },
        computed: {
            selectedLabel: {
                get() {
                    return this.tabs[this.index].label
                },
                set(newVal) {
                    this.index = this.tabs.findIndex((value) => {
                        return value.label === newVal
                    })
                }
            }
        },
        mounted() {
            this.onChange(this.index)
        },
        methods: {
            onScroll(pos) {
                // eslint-disable-next-line no-console
                const tabBarWidth = this.$refs.tabBar.$el.clientWidth
                const slideWidth = this.$refs.slide.slide.scrollerWidth
                const transform = -pos.x / slideWidth * tabBarWidth
                this.$refs.tabBar.setSliderTransform(transform)
            },
            onChange(current) {
                this.index = current
                const instance = this.$refs.component[current]
                instance.fetch && instance.fetch()
                // 缓存
                saveToLocal(this.id, 'index', this.index)
            }
        },
        created() {
            // 缓存tab索引
            this.index = loadFromLocal(this.id, 'index', this.initialIndex)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"

    .tab
        display: flex
        flex-direction: column
        height: 100%

        >>> .cube-tab
            padding: 10px 0

        .slide-wrapper
            flex: 1
            overflow: hidden
</style>
