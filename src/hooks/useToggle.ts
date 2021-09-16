import { ref } from "vue";

export default function useToggle(defaultValue: boolean = false) {
  const value = ref<Boolean>(defaultValue);

  const toggleValue = (boolean: any) => {
    value.value = typeof boolean === "boolean" ? boolean : !value.value;
  };

  return [value, toggleValue];
}
