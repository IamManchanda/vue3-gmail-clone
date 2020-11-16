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
import MailTable from "@/components/mail-table";
//#endregion

export default {
  name: "page-index",
  components: {
    MailTable,
  },
};
</script>

<style lang="scss" scoped>
.page-index {
}
</style>
