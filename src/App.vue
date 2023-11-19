<script setup lang="ts">
import { provide } from "vue";
import { RouterLink, RouterView } from "vue-router";

import MessageDialog from "@/common/messagedialog/MessageDialog.vue";
import { messageDialogKey } from "./common/messagedialog/MessageDialogKey";
import { MessageDialogController } from "./common/messagedialog/MessageDialogController";

// MessageDialogと各ページで利用できるように最上位でprovideする。
provide(messageDialogKey, new MessageDialogController());

</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink> |
        <RouterLink to="/sample">Sample</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <MessageDialog />
</template>
