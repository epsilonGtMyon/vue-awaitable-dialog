import type {
  MessageDialogHandle,
  MessageDialogParameter,
} from "./types/MessageDialogTypes";

/**
 * メッセージダイアログのコントローラー
 */
class MessageDialogController {

  /**
   * ダイアログの実体(コールバック)
   */
  private handle?: MessageDialogHandle;

  /**
   * ハンドルをインストールします。
   * @param handle ダイアログのハンドル
   */
  public installHandle(handle: MessageDialogHandle): void {
    this.handle = handle;
  }

  /**
   * ダイアログ表示(共通)
   * @param param パラメーター
   * @returns
   */
  private show(
    param: Omit<MessageDialogParameter, "buttonHandler" | "abortHandler">
  ): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.handle == undefined) {
        throw new Error("handle is not installed.");
      }

      const parameter: MessageDialogParameter = {
        ...param,
        buttonHandler: resolve,
        abortHandler: reject,
      };
      this.handle.show(parameter);
    });
  }

  /**
   * メッセージの表示
   * @param message メッセージ
   * @returns
   */
  public alert(message: string) {
    return this.show({
      title: "情報",
      message,
      buttons: ["OK"],
    }).then(() => true);
  }

  /**
   * 確認メッセージの表示
   * @param message メッセージ
   * @returns
   */
  public confirm(message: string) {
    return this.show({
      title: "確認",
      message,
      buttons: ["OK", "Cancel"],
    }).then((x) => x === 0); //0番目のボタン(OK)が押されればtrue
  }

  /**
   * もし開いてたらアボートする
   * @returns
   */
  public abort(): void {
    if (this.handle == undefined) {
      return;
    }
    this.handle.abort(new Error("MessageDialogAbort"));
  }
}

export { MessageDialogController };
