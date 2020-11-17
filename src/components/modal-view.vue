<template>
  <div class="component-modal-view">
    <div class="modal">
      <div class="overlay" @click="handleOverlay"></div>
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
    useKeydown([
      {
        key: "Escape",
        fn: () => emit("close-modal"),
      },
    ]);
    //#endregion

    //#region Reactive References
    const state = reactive({});
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    function handleOverlay() {
      emit("close-modal");
    }
    //#endregion

    return {
      ...toRefs(state),
      handleOverlay,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-modal-view {
}
</style>
