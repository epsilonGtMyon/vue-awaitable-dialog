<script setup lang="ts">
import { useMessageDialog } from "@/common/messagedialog/useMessageDialog";

const dialog = useMessageDialog();

async function showDialog() {
  if (await dialog.confirm("ダイアログを表示")) {
    await dialog.alert("OKが選択されました");
  } else {
    await dialog.alert("Cancelが選択されました");
  }
}
</script>

<template>
  <main>
    sample

    <div>
      <button @click="showDialog">ダイアログ表示</button>
    </div>
  </main>
</template>
