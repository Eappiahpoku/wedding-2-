<!--
  Navigation.vue
  Main navigation bar for Stratonea Funeral App
  - Stratonea-compliant: logo left, app name right, mobile-first, touch targets
  - Ghana-optimized: clear, simple, offline-friendly
  - Responsive improvements: better mobile menu, touch targets, sticky nav
  - Includes link to Donation Records (history) page
  - Full file, ready to copy-paste, with clear comments
-->

<template>
  <!-- ===== Navigation Bar ===== -->
  <nav class="bg-primary shadow sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- ===== Left: Logo & App Name ===== -->
        <router-link to="/" class="flex items-center space-x-2 min-w-[48px] min-h-[48px]">
          <StratoneaLogo white />
          <!-- ===== [New Feature] START ===== -->
          <span class="text-base sm:text-xl font-semibold text-white">Wedding Gift Tracker</span>
          <!-- ===== [New Feature] END ===== -->
        </router-link>
        <!-- ===== Desktop Navigation ===== -->
        <div class="hidden sm:flex sm:space-x-2 md:space-x-4">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-lg text-white font-semibold hover:bg-primary-light focus:bg-primary-dark focus:outline-none transition min-w-[48px] min-h-[48px]"
            :class="{ 'bg-primary-dark underline underline-offset-4': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </div>
        <!-- ===== Mobile Menu Button ===== -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="sm:hidden flex items-center justify-center p-3 rounded-lg text-white focus:outline-none min-w-[48px] min-h-[48px]"
          aria-controls="mobile-menu"
          :aria-expanded="isMobileMenuOpen"
        >
          <span class="sr-only">Open main menu</span>
          <!-- Hamburger Icon -->
          <svg
            v-if="!isMobileMenuOpen"
            class="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <!-- Close Icon -->
          <svg
            v-else
            class="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- ===== Mobile Menu ===== -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="sm:hidden bg-primary-700 shadow-lg"
        id="mobile-menu"
      >
        <div class="flex flex-col gap-1 px-2 pt-2 pb-3">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="text-white rounded-lg px-4 py-4 text-base font-medium hover:bg-primary-500 focus:bg-primary-dark transition min-w-[48px] min-h-[48px]"
            :class="{ 'bg-primary-dark font-bold': $route.path === item.path }"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref } from 'vue'
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'

// ===== Mobile Menu State =====
const isMobileMenuOpen = ref(false)

// ===== Navigation Items =====
// Stratonea guideline: Home, Gift Records, About, Contact
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Records', path: '/gift-history' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

</script>