//#region Imports
import { reactive, toRefs } from "vue";
//#endregion

const emails = reactive(new Set());

const useEmailSelection = () => {
  //#region Reactive References
  const state = reactive({});
  //#endregion

  //#region Watchers
  //#endregion

  //#region Lifecycle hooks
  //#endregion

  //#region Methods
  function toggle(email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  }
  //#endregion

  return {
    ...toRefs(state),
    emails,
    toggle,
  };
};

export default useEmailSelection;
