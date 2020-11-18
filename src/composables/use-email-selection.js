//#region Imports
import { reactive, toRefs } from "vue";
import axios from "axios";
//#endregion

const emails = reactive(new Set());

const useEmailSelection = () => {
  //#region Reactive References
  const state = reactive({});
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

  function markSelected(fn) {
    emails.forEach(email => {
      fn(email);
      updateEmail(email);
    });
  }

  function toggle(email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  }

  function clear() {
    emails.clear();
  }

  function addMultiple(newEmails) {
    newEmails.forEach(email => {
      emails.add(email);
    });
  }

  function markRead() {
    markSelected(email => {
      email.read = true;
    });
  }

  function markUnread() {
    markSelected(email => {
      email.read = false;
    });
  }

  function archive() {
    markSelected(email => {
      email.archived = true;
    });
    clear();
  }
  //#endregion

  return {
    ...toRefs(state),
    emails,
    toggle,
    clear,
    addMultiple,
    markRead,
    markUnread,
    archive,
  };
};

export default useEmailSelection;
