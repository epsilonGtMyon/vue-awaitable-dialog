import { inject, onBeforeUnmount } from "vue";
import { messageDialogKey } from "./MessageDialogKey";

/**
 * メッセージダイアログを使用する。
 *
 * @returns メッセージダイアログのコントローラー
 */
function useMessageDialog() {
  const messageDialog = inject(messageDialogKey);
  if (messageDialog == undefined) {
    throw new Error(`messageDialog is not found`);
  }

  //ダイアログが表示されているコンポーネントが廃棄されるときにダイアログが表示されていれば、ダイアログも閉じる
  onBeforeUnmount(() => {
    messageDialog.abort();
  });

  return messageDialog;
}

export { useMessageDialog };
