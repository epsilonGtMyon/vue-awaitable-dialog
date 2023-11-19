/** ダイアログの実体を操作するためのハンドル(コールバック) */
type MessageDialogHandle = {
  show(param: MessageDialogParameter): void;
  abort<T extends Error>(error: T): void;
};

/**
 * メッセージダイアログのパラメーター
 */
type MessageDialogParameter = {
  title: string,
  message: string,
  buttons: string[],
  buttonHandler: MessageDialogButtonHandler,
  abortHandler: MessageDialogAbortHandler,
}

/**
 * メッセージダイアログのボタンを押下したときのハンドラー
 */
type MessageDialogButtonHandler = (index: number) => void;

/**
 * メッセージダイアログを異常終了するときのハンドラー
 */
type MessageDialogAbortHandler = <T extends Error>(error: T) => void;

export type {
  MessageDialogHandle,
  MessageDialogParameter, 
  MessageDialogButtonHandler,
  MessageDialogAbortHandler
}