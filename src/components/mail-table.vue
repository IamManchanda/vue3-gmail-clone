<template>
  <div class="component-mail-table">
    <table class="mail-table">
      <tbody>
        <tr
          v-for="email in unarchivedEmails"
          :key="email.id"
          :class="['clickable', email.read ? 'read' : '']"
          @click="handleEmailAsOpen(email)"
        >
          <td>
            <input type="checkbox" />
          </td>
          <td>{{ email.from }}</td>
          <td>
            <p>
              <strong>{{ email.subject }}</strong> - {{ email.body }}
            </p>
          </td>
          <td class="date">
            {{ format(new Date(email.sentAt), "MMM do yyyy") }}
          </td>
          <td>
            <button @click="handleEmailAsArchived(email)">Archive</button>
          </td>
        </tr>
      </tbody>
    </table>
    <modal-view v-if="openedEmail" @close-modal="handleModalAsClose">
      <mail-view :email="openedEmail" />
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
//#endregion

export default {
  name: "component-mail-table",
  components: {
    MailView,
    ModalView,
  },
  async setup() {
    //#region Async Data
    const { data: emails } = await axios.get(
      "https://json-server-gmail-clone.harrymanchanda.in/emails",
    );
    //#endregion

    //#region Reactive References
    const state = reactive({
      emails,
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
      email.read = true;
      updateEmail(email);
      state.openedEmail = email;
    }

    function handleEmailAsArchived(email) {
      email.archived = true;
      updateEmail(email);
    }

    function handleModalAsClose() {
      state.openedEmail = null;
    }
    //#endregion

    return {
      ...toRefs(state),
      format,
      handleEmailAsOpen,
      handleEmailAsArchived,
      handleModalAsClose,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-mail-table {
}
</style>
