<template>
  <div class="min-h-screen bg-gray-50 pb-16">
    <!-- Network status indicator for Ghana's intermittent connectivity -->
    <OfflineIndicator v-if="!networkInfo.isOnline" />

  
    <Navigation />

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>

    <!-- Donation content -->
    <Donation v-if="showDonation" @close="handleDonationClose" />

    <!-- To Always See and Edit Donation Control  -->

    <!-- <Donation v-if="showDonation" @close="showDonation = false" /> -->

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">


  //== To Always See and Edit Donation Control ==//
  // const showDonation = ref(true)

  //== To Always See and Edit Donation Control ==//


 // ===== File-Level Imports =====
  import { useNetworkStatus } from '@/composables/useNetworkStatus'
  import { ref } from 'vue'
  import OfflineIndicator from '@/components/base/OfflineIndicator.vue'
  import Navigation from '@/components/layout/Navigation.vue'
  import Footer from '@/components/layout/Footer.vue'
  import Donation from '@/components/donation/Donation.vue'

  // ===== Constants & Config =====
  // Keys for localStorage to track donation modal state
  const DONATION_MODAL_KEY = 'stratonea_donation_last_closed'
  const DONATION_MODAL_FIRST_SEEN_KEY = 'stratonea_first_seen'
  const DONATION_MODAL_INTERVAL = 7 * 24 * 60 * 60 * 1000 // 7 days in ms

  // ===== Helper Functions =====

  /**
   * Returns the timestamp (ms) of the user's first visit.
   * If not set, sets it to now and returns now.
   * This ensures we know when the user first started using the app.
   */
  function getOrSetFirstSeen(): number {
    let firstSeen = localStorage.getItem(DONATION_MODAL_FIRST_SEEN_KEY)
    if (!firstSeen) {
      const now = Date.now()
      localStorage.setItem(DONATION_MODAL_FIRST_SEEN_KEY, now.toString())
      return now
    }
    return parseInt(firstSeen, 10)
  }

  /**
   * Determines if the donation modal should be shown.
   * - Only show if at least 7 days have passed since first visit.
   * - After first show, only show every 7 days after last closed.
   */
  function shouldShowDonationModal(): boolean {
    const now = Date.now()
    const firstSeen = getOrSetFirstSeen()

    // ===== [New Feature] START =====
    // Only show if 7 days have passed since first visit
    if (now - firstSeen < DONATION_MODAL_INTERVAL) {
      // Not enough time has passed; don't show modal
      return false
    }
    // ===== [New Feature] END =====

    // After first eligible show, only show every 7 days after last closed
    const lastClosed = localStorage.getItem(DONATION_MODAL_KEY)
    if (!lastClosed) return true // Never closed before, show after 7 days
    const lastClosedTime = parseInt(lastClosed, 10)
    return isNaN(lastClosedTime) || now - lastClosedTime > DONATION_MODAL_INTERVAL
  }

  /**
   * Records the current time as the last time the donation modal was closed.
   * This prevents the modal from showing again until another 7 days have passed.
   */
  function recordDonationModalClosed(): void {
    localStorage.setItem(DONATION_MODAL_KEY, Date.now().toString())
  }

  // ===== Main Logic =====

  // Controls whether the donation modal is visible
  const showDonation = ref(shouldShowDonationModal())

  /**
   * Handles closing the donation modal.
   * - Records the close time.
   * - Hides the modal.
   */
  function handleDonationClose() {
    recordDonationModalClosed()
    showDonation.value = false
  }

  // Get network info for offline indicator
  const { networkInfo } = useNetworkStatus()
</script>

<style>
  /* Add any additional global styles here */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>