<!--
  DeceasedPhotoPlaceholder.vue
  Stratonea-compliant SVG placeholder for deceased photo
  - Mobile-first, respectful, and visually appealing
  - Ghana-optimized: fast load, no network needed, clear for all users
-->

<template>
  <div
    class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200 shadow-lg relative"
    aria-label="No photo"
  >
    <!-- SVG illustration: respectful silhouette -->
    <svg
      width="64"
      height="64"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000000"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      class="opacity-70"
      aria-hidden="true"
    >
      <circle cx="8" cy="6" r="3.25"/>
      <path d="m2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/>
    </svg>
    <!-- Optional label for clarity -->
    
  </div>
</template>

<script setup lang="ts">
// No logic needed; this is a presentational component.
</script>