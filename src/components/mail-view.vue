<template>
  <div class="component-mail-view">
    <div class="email-display">
      <h2 class="mb-0">Subject:</h2>
      <div>
        <em>
          From {{ email.from }} on
          {{ format(new Date(email.sentAt), "MMM do yyyy") }}
        </em>
      </div>
      <div v-html="marked(email.body)" />
    </div>
  </div>
</template>

<script>
//#region Imports
import { reactive, toRefs } from "vue";
import { format } from "date-fns";
import marked from "marked";
//#endregion

export default {
  name: "component-mail-view",
  props: {
    email: {
      type: Object,
      required: true,
    },
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
      format,
      marked,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-mail-view {
}
</style>
