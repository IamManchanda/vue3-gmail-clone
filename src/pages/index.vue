<template>
  <div class="page-index">
    <h1>VMail Inbox</h1>
    <h1>{{ emailSelection.emails.size }} emails selected</h1>

    <suspense>
      <template #default>
        <mail-table />
      </template>
      <template #fallback>
        Loading...
      </template>
    </suspense>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import MailTable from "@/components/mail-table";
import useEmailSelection from "../composables/use-email-selection";
//#endregion

export default {
  name: "page-index",
  components: {
    MailTable,
  },
  setup() {
    //#region useComposables
    const emailSelection = useEmailSelection();
    //#endregion

    //#region Reactive References
    const state = reactive({
      emailSelection,
    });
    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    //#endregion

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.page-index {
}
</style>
