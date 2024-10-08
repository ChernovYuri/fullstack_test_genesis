import { defineStore } from 'pinia';

export const useEntityStore = defineStore('entity', {
    state: () => ({
        entities: [],
        selectedEntity: 'none',
    }),
    actions: {
        addEntity(entity: { id: number; type: string }) {
            this.entities.push(entity);
        },
        setSelectedEntity(entityType: string) {
            this.selectedEntity = entityType;
        },
    },
});
