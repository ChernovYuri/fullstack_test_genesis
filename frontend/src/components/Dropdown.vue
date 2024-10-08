<template>
    <div>
        <select v-model="selectedEntity" @change="handleSelection">
            <option value="none">Не выбрано</option>
            <option value="lead">Сделка</option>
            <option value="contact">Контакт</option>
            <option value="company">Компания</option>
        </select>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, PropType} from 'vue';

    export default defineComponent({
        props: {
            onSelect: {
                type: Function as PropType<(value: string) => void>,
                required: false,
            },
        },
        setup(props) {
            const selectedEntity = ref<string>('none')

            const handleSelection = () => {
                if (props.onSelect) {
                    props.onSelect(selectedEntity.value)
                }
            }

            return {selectedEntity, handleSelection}
        },
    })
</script>
