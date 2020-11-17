//#region Imports
import { onBeforeMount, onBeforeUnmount, reactive, toRefs } from "vue";
//#endregion

const useKeydown = keyCombos => {
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
  function handleKeydown(event) {
    const kc = keyCombos.find(keyCombo => keyCombo.key === event.key);

    if (kc) kc.fn();
  }
  //#endregion

  return {
    ...toRefs(state),
  };
};

export default useKeydown;
