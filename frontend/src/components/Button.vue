<template>
    <button :disabled="!isActive" @click="onClick">
        <span v-if="isLoading" class="spinner" />
        <span v-else>Создать</span>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        props: {
            isActive: {
                type: Boolean,
                default: false,
            },
            isLoading: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['click'],
        setup(props, { emit }) {
            const onClick = () => {
                if (props.isActive && !props.isLoading) {
                    emit('click')
                }
            }
            return { onClick }
        },
    })
</script>

<style scoped>
    button {
        cursor: pointer;
        padding: 10px;
    }

    button:disabled {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fcfcfc;
        color: #2f4252;
        cursor: not-allowed;
        width: 80px;
        height: 30px;
        border-radius: 2px;
        font-weight: 600;
        border-color: #e3e5e6;
    }

    button:enabled {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4c8bf7;
        color: white;
        width: 80px;
        height: 30px;
        border-radius: 2px;
        font-weight: 600;
        border-color: #2976f8;
    }

    .spinner {
        border: 2px solid rgba(0, 0, 0, 0);
        border-left-color: white;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

</style>
