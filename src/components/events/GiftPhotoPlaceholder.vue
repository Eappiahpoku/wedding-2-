<!--
  GiftPhotoPlaceholder.vue
  Stratonea-compliant SVG placeholder for gift photo
  - Mobile-first, visually appealing, and fast load
  - Ghana-optimized: no network needed, clear for all users
-->

<template>
  <div
    aria-label="No gift photo"
    class="flex items-center justify-center w-full h-full bg-wedding-50 rounded-stratonea border border-wedding-200"
  >
    <!-- ===== [New Feature] START ===== -->
    <!-- SVG Gift Box Icon Placeholder -->
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
      <rect x="1" y="18" fill="none" stroke="#FF2E84" stroke-width="2" stroke-miterlimit="10" width="62" height="9"/>
      <rect x="6" y="27" fill="none" stroke="#FF2E84" stroke-width="2" stroke-miterlimit="10" width="52" height="31"/>
      <line fill="none" stroke="#FF2E84" stroke-width="2" stroke-miterlimit="10" x1="32" y1="58" x2="32" y2="18"/>
      <path fill="none" stroke="#FF2E84" stroke-width="2" stroke-miterlimit="10" d="M32,18c0,0-13,0.101-13-9c0-7,13-4.068,13,2 C32,17.067,32,18,32,18z"/>
      <path fill="none" stroke="#FF2E84" stroke-width="2" stroke-miterlimit="10" d="M32,18c0,0,13,0.101,13-9c0-7-13-4.068-13,2 C32,17.067,32,18,32,18z"/>
    </svg>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// No logic needed; this is a presentational component.
</script>
