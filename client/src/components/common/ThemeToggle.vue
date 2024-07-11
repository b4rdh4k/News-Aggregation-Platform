<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      class="sr-only peer"
      type="checkbox"
      @change="toggleTheme"
      :checked="currentTheme === 'dark'"
    />
    <div
      class="w-16 h-8 rounded-full ring-0 peer duration-500 outline-none bg-primary overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-6 before:w-6 before:top-1/2 before:bg-primarz before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-secondary peer-checked:shadow-lg peer-checked:shadow-dark-secondary peer-checked:bg-dark-primary after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-6 after:h-6 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
    ></div>
  </label>
</template>

<script>
import { setTheme, getTheme } from '../../utils/theme'

export default {
  name: 'ThemeToggle',
  data() {
    return {
      currentTheme: getTheme()
    }
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
      setTheme(this.currentTheme)
    }
  }
}
</script>
