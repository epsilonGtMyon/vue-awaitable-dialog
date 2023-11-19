import type { InjectionKey } from "vue";
import { MessageDialogController } from "./MessageDialogController";

/**
 * メッセージダイアログをinjectするためのキー
 */
const messageDialogKey: InjectionKey<MessageDialogController> = Symbol();
export { messageDialogKey };