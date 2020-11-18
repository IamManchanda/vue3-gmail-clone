<template>
  <div class="component-bulk-action-bar">
    <div class="bulk-action-bar">
      <span class="checkbox">
        <input
          type="checkbox"
          :checked="allEmailsSelected"
          :class="[someEmailsSelected ? 'partial-check' : '']"
          @click="handleBulkSelection"
        />
      </span>
      <span class="buttons">
        <button
          @click="emailSelection.markRead()"
          :disabled="[...emailSelection.emails].every(e => e.read)"
        >
          Mark Read
        </button>
        <button
          @click="emailSelection.markUnread()"
          :disabled="[...emailSelection.emails].every(e => !e.read)"
        >
          Mark Unread
        </button>
        <button
          v-if="screen === 'inbox'"
          @click="emailSelection.markArchive()"
          :disabled="numberOfSelectedEmails === 0"
        >
          Archive
        </button>
        <button
          v-else
          @click="emailSelection.markUnarchive()"
          :disabled="numberOfSelectedEmails === 0"
        >
          Move to Inbox
        </button>
      </span>
    </div>
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
    screen: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //#region useComposables
    const emailSelection = useEmailSelection();
    //#endregion

    //#region Reactive References
    const state = reactive({
      numberOfSelectedEmails: computed(() => emailSelection.emails.size),
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
        emailSelection.clear();
      } else {
        emailSelection.addMultiple(props.emails);
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      emailSelection,
      handleBulkSelection,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-bulk-action-bar {
}
</style>
