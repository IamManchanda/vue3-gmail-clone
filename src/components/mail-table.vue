<template>
  <div class="component-mail-table">
    <bulk-action-bar :emails="unarchivedEmails" />
    <table class="mail-table">
      <tbody>
        <tr
          v-for="email in unarchivedEmails"
          :key="email.id"
          :class="['clickable', email.read ? 'read' : '']"
        >
          <td>
            <input
              type="checkbox"
              @click="emailSelection.toggle(email)"
              :checked="emailSelection.emails.has(email)"
            />
          </td>
          <td @click="handleEmailAsOpen(email)">{{ email.from }}</td>
          <td @click="handleEmailAsOpen(email)">
            <p>
              <strong>{{ email.subject }}</strong> - {{ email.body }}
            </p>
          </td>
          <td class="date" @click="handleEmailAsOpen(email)">
            {{ format(new Date(email.sentAt), "MMM do yyyy") }}
          </td>
          <td>
            <button @click="handleEmailAsArchived(email)">Archive</button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal-view v-if="openedEmail" @close-modal="handleCloseModal">
      <mail-view :email="openedEmail" @change-email="handleChangeEmail" />
    </modal-view>
  </div>
</template>

<script>
//#region Imports
import { computed, reactive, toRefs } from "vue";
import { format } from "date-fns";
import axios from "axios";
import MailView from "@/components/mail-view";
import ModalView from "@/components/modal-view";
import BulkActionBar from "@/components/bulk-action-bar";
import useEmailSelection from "../composables/use-email-selection";
//#endregion

export default {
  name: "component-mail-table",
  components: {
    MailView,
    ModalView,
    BulkActionBar,
  },
  async setup() {
    //#region Async Data
    const { data: emails } = await axios.get(
      "https://json-server-gmail-clone.harrymanchanda.in/emails",
    );
    //#endregion

    //#region useComposables
    const emailSelection = useEmailSelection();
    //#endregion

    //#region Reactive References
    const state = reactive({
      emails,
      emailSelection,
      openedEmail: null,
      sortedEmails: computed(() =>
        state.emails.sort((e1, e2) => (e1.sentAt < e2.sentAt ? 1 : -1)),
      ),
      unarchivedEmails: computed(() =>
        state.sortedEmails.filter(e => !e.archived),
      ),
    });

    //#endregion

    //#region Watchers
    //#endregion

    //#region Lifecycle hooks
    //#endregion

    //#region Methods
    function updateEmail(email) {
      axios.put(
        `https://json-server-gmail-clone.harrymanchanda.in/emails/${email.id}`,
        email,
      );
    }

    function handleEmailAsOpen(email) {
      state.openedEmail = email;

      if (email) {
        email.read = true;
        updateEmail(email);
      }
    }

    function handleEmailAsArchived(email) {
      email.archived = true;
      updateEmail(email);
    }

    function handleCloseModal() {
      state.openedEmail = null;
    }

    function handleChangeEmail({
      toggleRead,
      toggleArchive,
      save,
      closeModal,
      changeIndex,
    }) {
      if (toggleRead) {
        state.openedEmail.read = !state.openedEmail.read;
      }

      if (toggleArchive) {
        state.openedEmail.archived = !state.openedEmail.archived;
      }

      if (save) {
        updateEmail(state.openedEmail);
      }

      if (closeModal) {
        state.openedEmail = null;
      }

      if (changeIndex) {
        const currentIndex = state.unarchivedEmails.indexOf(state.openedEmail);
        const newEmail = state.unarchivedEmails[currentIndex + changeIndex];
        handleEmailAsOpen(newEmail);
      }
    }
    //#endregion

    return {
      ...toRefs(state),
      format,
      handleEmailAsOpen,
      handleEmailAsArchived,
      handleCloseModal,
      handleChangeEmail,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-mail-table {
}
</style>
