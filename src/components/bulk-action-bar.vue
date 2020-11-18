<template>
  <div class="component-bulk-action-bar">
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="[someEmailsSelected ? 'partial-check' : '']"
      @click="handleBulkSelection"
    />
  </div>
</template>

<script>
//#region Imports
import { computed, reactive, toRefs } from "vue";
import useEmailSelection from "../composables/use-email-selection";
//#endregion

export default {
  name: "component-bulk-action-bar",
  props: {
    emails: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    //#region useComposables
    const emailSelection = useEmailSelection();
    //#endregion

    //#region Reactive References
    const state = reactive({
      emailSelection,
      numberOfSelectedEmails: computed(() => state.emailSelection.emails.size),
      allEmailsSelected: computed(
        () => state.numberOfSelectedEmails === props.emails.length,
      ),
      someEmailsSelected: computed(
        () =>
          state.numberOfSelectedEmails > 0 &&
          state.numberOfSelectedEmails < props.emails.length,
      ),
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    function handleBulkSelection() {
      if (state.allEmailsSelected) {
        state.emailSelection.clear();
      } else {
        state.emailSelection.addMultiple(props.emails);
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      handleBulkSelection,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-bulk-action-bar {
}
</style>
