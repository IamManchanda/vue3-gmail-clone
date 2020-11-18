<template>
  <div class="component-modal-view">
    <div class="modal">
      <div class="overlay" @click="handleCloseModal"></div>
      <div class="modal-card">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import useKeydown from "../composables/use-keydown";
//#endregion

export default {
  name: "component-modal-view",
  setup(props, { emit }) {
    //#region useComposables
    useKeydown([{ key: "Escape", fn: handleCloseModal }]);
    //#endregion

    //#region Reactive References
    const state = reactive({});
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    function handleCloseModal() {
      emit("close-modal");
    }
    //#endregion

    return {
      ...toRefs(state),
      handleCloseModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-modal-view {
}
</style>
