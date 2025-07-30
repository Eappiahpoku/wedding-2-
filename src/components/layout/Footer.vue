<template>
  <footer class="bg-primary-600 text-white mt-auto mb-28">
    <!-- Main container with max width and padding -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Two-column grid: vertical on mobile, horizontal on desktop -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <!-- Contact Section -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Help Us Improve - Share Your Feedback</h3>
          <div class="space-y-3">
            <!-- WhatsApp -->
            <a href="https://wa.me/233594093926" target="_blank" rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 hover:text-primary-200 transition-colors">
              <font-awesome-icon icon="fa-brands fa-whatsapp" class="text-xl" />
              <span>WhatsApp: +233 59 409 3926</span>
            </a>

            <!-- Email -->
            <a href="mailto:stratoneaconsult@gmail.com"
              class="flex items-center justify-center gap-2 hover:text-primary-200 transition-colors">
              <font-awesome-icon :icon="['fas', 'envelope']" class="text-xl" />
              <span>stratoneaconsult@gmail.com</span>
            </a>
          </div>
        </div>

        <!-- Support Section -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Support Our Mission</h3>
          <p class="text-sm text-primary-100">
            Help us keep this tool free for SMEs across Ghana
          </p>

          <!-- Mobile Money Button -->
          <button @click="copyToClipboard('0594093926')" class="w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-6 py-3 
                   bg-primary-700 hover:bg-primary-800 rounded-lg transition-colors">
            <font-awesome-icon icon="fa-solid fa-mobile-screen" class="text-xl" />
            <span>MTN MoMo: 0594093926</span>
            <font-awesome-icon icon="fa-solid fa-copy" class="ml-2 text-sm opacity-75" />
          </button>
          <p class="text-xs text-primary-200">Click to copy number</p>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-primary-500 my-8 max-w-xs mx-auto"></div>

      <!-- Footer Bottom - Always Centered -->
      <div class="text-center space-y-4">
        <p class="text-sm text-primary-200">
          © {{ new Date().getFullYear() }} Created with
          <span class="mx-1 animate-pulse">❤️</span>
          by TekLumen
        </p>
        <div class="flex items-center justify-center gap-2 text-xs text-primary-200">
          <span>Made in</span>
          <img src="/ghana-flag.png" alt="Ghana Flag" class="w-4 h-4 rounded-sm" />
          <span>Ghana</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const toast = useToast()

// ===== [Fix] Updated Toast Function Calls =====
async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    // Fixed: Removed extra options object, using single message parameter
    toast.success('MoMo number copied! Thank you for your support! 🙏')
  } catch (err) {
    // Fixed: Removed extra options object, using single message parameter
    toast.error('Could not copy number. Please try manually.')
  }
}
</script>

<style scoped>
.transition-transform {
  transition-duration: 200ms;
}

/* Hover effect for interactive elements */
a:hover, button:hover {
  transform: translateY(-1px);
}
</style>