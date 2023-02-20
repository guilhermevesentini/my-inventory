// darkMode.js
import { ref } from "@vue/runtime-core";

const DARK_MODE_KEY = 'my_app_dark_mode';
export const darkMode = ref(false);

export function toggleMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode.value));
}
