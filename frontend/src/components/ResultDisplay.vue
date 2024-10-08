<template>
    <div>
        <ul>
            <li v-for="entity in entities" :key="entity.id">
                <div class="entityData">
                    <span>{{ entity.type }}:</span>
                    <span>{{ entity.id }}</span>
                    <span>{{ entity.name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        props: {
            entities: {
                type: Array,
                default: () => [],
            },
        },
    });
</script>

<style scoped>
    .entityData {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
</style>