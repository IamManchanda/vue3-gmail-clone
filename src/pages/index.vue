<template>
  <div class="page-index">
    <h1>VMail Inbox</h1>

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
//#endregion

export default {
  name: "page-index",
  components: {
    MailTable,
  },
  setup() {
    //#region Reactive References
    const state = reactive({});
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
