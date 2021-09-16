<template>
  <div>
    Index
    {{ storage }} - {{ previous }}
    <button @click="increate">Remove</button>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import useArray from "../hooks/useArray";
import usePrevious from "../hooks/usePrevious";
import { useLocalStorage, useSessionStorage } from "../hooks/useStorage";
export default {
  setup() {
    const { value, push, replace, replaceCB, filter } = useArray([
      1, 2, 3, 4, 5,
    ]);
    const count = ref(0);
    const previous = usePrevious(count);

    const [storage, setStorage] = useLocalStorage("name", "hiep");
    const increate = () => setStorage("HiepTran");
    return {
      value,
      increate,
      count,
      storage,
      previous,
    };
  },
};
</script>
<style lang="scss" scoped></style>
