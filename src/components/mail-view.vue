<template>
  <div class="component-mail-view">
    <div class="email-display">
      <div>
        <button @click="handleEmailArchiveToggle">
          {{ email.archived ? "Move to Inbox (e)" : "Archive (e)" }}
        </button>
        <button @click="handleEmailReadToggle">
          {{ email.read ? "Mark Unread (r)" : "Mark Read (r)" }}
        </button>
        <button @click="goNewer">Newer (k)</button>
        <button @click="goOlder">Older (j)</button>
      </div>
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
import useKeydown from "../composables/use-keydown";
//#endregion

export default {
  name: "component-mail-view",
  props: {
    email: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    //#region useComposables
    useKeydown([
      { key: "r", fn: handleEmailReadToggle },
      { key: "e", fn: handleEmailArchiveToggle },
      { key: "k", fn: goNewer },
      { key: "j", fn: goOlder },
      { key: "[", fn: goNewerAndArchive },
      { key: "]", fn: goOlderAndArchive },
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
    function handleEmailReadToggle() {
      emit("change-email", {
        toggleRead: true,
        save: true,
      });
    }

    function handleEmailArchiveToggle() {
      emit("change-email", {
        toggleArchive: true,
        save: true,
        closeModal: true,
      });
    }

    function goNewer() {
      emit("change-email", {
        changeIndex: -1,
      });
    }

    function goOlder() {
      emit("change-email", {
        changeIndex: 1,
      });
    }

    function goNewerAndArchive() {
      emit("change-email", {
        changeIndex: -1,
        toggleArchive: true,
        save: true,
      });
    }

    function goOlderAndArchive() {
      emit("change-email", {
        changeIndex: 1,
        toggleArchive: true,
        save: true,
      });
    }
    //#endregion

    return {
      ...toRefs(state),
      format,
      marked,
      handleEmailReadToggle,
      handleEmailArchiveToggle,
      goNewer,
      goOlder,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-mail-view {
  .email-display {
    text-align: left;
  }
}
</style>
