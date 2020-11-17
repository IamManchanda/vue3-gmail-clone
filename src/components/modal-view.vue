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
import { onBeforeMount, onBeforeUnmount, reactive, toRefs } from "vue";
//#endregion

export default {
  name: "component-modal-view",
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
  setup(_props, { emit }) {
    //#region Reactive References
    const state = reactive({});
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    onBeforeMount(() => {
      window.addEventListener("keydown", handleKeydown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
    //#endregion

    //#region Methods
    function handleOverlay() {
      emit("close-modal");
    }

    function handleKeydown(event) {
      if (event.key === "Escape") {
        emit("close-modal");
      }
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
