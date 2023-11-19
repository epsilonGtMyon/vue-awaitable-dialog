<script setup lang="ts">
import { onMounted, ref } from "vue";
import type {
  MessageDialogParameter,
  MessageDialogButtonHandler,
  MessageDialogAbortHandler,
} from "./types/MessageDialogTypes";
import { useMessageDialog } from "./useMessageDialog";

const messageDialog = useMessageDialog();

// -------------------------------
// 初期値の設定

const visible = ref(false);
const title = ref("");
const message = ref("");
const buttons = ref<string[]>([]);

let buttonHandler: MessageDialogButtonHandler = () => {
  //noop
};
let abortHandler: MessageDialogAbortHandler = () => {
  //noop
};

onMounted(() => {
  // 各ページで利用できるように
  // コントローラーのハンドルにこのMessageDialog.vueを設定する。
  messageDialog.installHandle({
    show,
    abort(error) {
      abortHandler(error);
      cleanup();
    },
  });
});

//-------------------------------

/**
 * ダイアログの表示
 * @param parameter パラメータ
 */
function show(parameter: MessageDialogParameter) {
  visible.value = true;

  title.value = parameter.title;
  message.value = parameter.message;
  buttons.value = parameter.buttons;
  buttonHandler = parameter.buttonHandler;
  abortHandler = parameter.abortHandler;
}

/**
 * クリーンアップ(閉じるとき)
 */
function cleanup() {
  visible.value = false;

  title.value = "";
  message.value = "";
  buttons.value = [];
  buttonHandler = () => {
    //noop
  };
  abortHandler = () => {
    //noop
  };
}

/**
 * ダイアログボタンクリック時
 * @param index 押されたボタンのインデックス
 */
function handleButtonClick(index: number) {
  buttonHandler(index);
  // ボタンクリック時に消すので
  cleanup();
}
</script>

<template>
  <div class="messageDialog" v-if="visible">
    <div class="messageDialog-background"></div>
    <div class="messageDialog-content">
      <div class="messageDialog-contentHeader">{{ title }}</div>
      <div class="messageDialog-contentBody">{{ message }}</div>
      <div class="messageDialog-contentButtons">
        <template v-for="(button, index) of buttons">
          <button @click="handleButtonClick(index)">{{ button }}</button>
        </template>
      </div>
    </div>
  </div>
</template>
