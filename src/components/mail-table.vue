<template>
  <div class="component-mail-table">
    <table class="mail-table">
      <tbody>
        <tr
          v-for="email in unarchivedEmails"
          :key="email.id"
          :class="['clickable', email.read ? 'read' : '']"
          @click="handleEmailAsRead(email)"
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
  </div>
</template>

<script>
//#region Imports
import { computed, reactive, toRefs } from "vue";
import { format } from "date-fns";
import axios from "axios";
//#endregion

export default {
  name: "component-mail-table",
  async setup() {
    //#region Async Data
    const { data: emails } = await axios.get(
      "https://json-server-gmail-clone.harrymanchanda.in/emails",
    );
    //#endregion

    //#region Reactive References
    const state = reactive({
      emails,
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

    function handleEmailAsRead(email) {
      email.read = true;
      updateEmail(email);
    }

    function handleEmailAsArchived(email) {
      email.archived = true;
      updateEmail(email);
    }
    //#endregion

    return {
      ...toRefs(state),
      format,
      handleEmailAsRead,
      handleEmailAsArchived,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-mail-table {
}
</style>
