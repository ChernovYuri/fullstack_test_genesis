<template>
    <div class="appContainer">
        <div class="appButtons">
            <Dropdown :onSelect="handleSelect"/>
            <Button :isActive="isButtonActive" :isLoading="isLoading" @click="createEntity"/>
        </div>
        <div class="appContent">
            <ResultDisplay :entities="entityStore.entities"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import {useEntityStore} from './store/entities';
    import Dropdown from './components/Dropdown.vue';
    import Button from './components/Button.vue';
    import ResultDisplay from './components/ResultDisplay.vue';
    import {entityAPI} from "./api/api";

    export default defineComponent({
        components: {Dropdown, Button, ResultDisplay},
        setup() {
            const entityStore = useEntityStore()
            const isLoading = ref<boolean>(false)
            const isButtonActive = ref<boolean>(false)

            const handleSelect = (entityType: string) => {
                entityStore.setSelectedEntity(entityType)
                isButtonActive.value = entityType !== 'none'
            }

            const createEntity = async () => {
                isLoading.value = true
                try {
                    const response = await entityAPI.createEntity(entityStore.selectedEntity)
                    console.log(response)
                    entityStore.addEntity({
                        id: response.data.id,
                        type: entityStore.selectedEntity,
                        name: response.data.name
                    })
                } catch (error) {
                    console.error(error)
                } finally {
                    isLoading.value = false
                }
            }

            return {handleSelect, createEntity, entityStore, isButtonActive, isLoading}
        },
    })
</script>

<style scoped>
    .appContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .appButtons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }
</style>
