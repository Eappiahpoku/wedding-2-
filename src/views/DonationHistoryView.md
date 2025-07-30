# DonationHistoryView

``` ts

<!--
  DonationHistoryView.vue
  Displays a list of all donations for the current event.
  - Loads donation records from localForage (offline-first)
  - Mobile-first, touch-friendly table/list
  - Ghana-optimized: clear, simple, and fast
  - Stratonea-compliant: full file, clear comments, ready to copy-paste
  - ===== [New Feature] START ===== Filter donations by current event to prevent mixing ===== [New Feature] END =====
  - ===== [New Feature] START ===== Reorder columns and add total section ===== [New Feature] END =====
-->


<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <!-- ===== App Header (Stratonea Standard) ===== -->
    <header class="flex items-center justify-between px-4 py-3 bg-primary text-white shadow-md">
      <!-- Stratonea Logo on the left -->
      <StratoneaLogo white />
      <!-- App Name on the right -->
      <span class="text-lg font-bold tracking-wide">Donation Records</span>
    </header>

    <main class="container mx-auto p-4 md:p-8">
      <!-- ===== Show current event name ===== -->
      <h1 class="text-xl font-bold mb-2 text-center">
        Donations for:
        <span class="text-primary">
          {{ currentEvent?.eventName || 'No Event Selected' }}
        </span>
      </h1>
      <p class="text-gray-600 text-center mb-6">
        View all donations made for this event. Works offline.
      </p>

      <!-- ===== Loading State ===== -->
      <div v-if="isLoading" class="flex justify-center items-center py-10">
        <span class="text-primary font-semibold">Loading donations...</span>
      </div>

      <!-- ===== No Donations State ===== -->
      <div v-else-if="filteredDonations.length === 0" class="text-center text-gray-500 py-10">
        No donations found yet for this event.
      </div>

      <!-- ===== Donations Table/List ===== -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr class="bg-gray-100 text-xs uppercase text-gray-600">
              <th class="py-3 px-2">#</th>
              <th class="py-3 px-2">Donor</th>
              <th class="py-3 px-2">Date</th>
              <th class="py-3 px-2">Receipt</th>
              <th class="py-3 px-2">Payment</th>
              <th class="py-3 px-2">Phone</th>
              <th class="py-3 px-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(donation, idx) in filteredDonations"
              :key="donation.receiptNumber"
              class="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <td class="py-2 px-2 text-center font-semibold">{{ idx + 1 }}</td>
              <td class="py-2 px-2 font-medium">{{ donation.donorName }}</td>
              <td class="py-2 px-2 whitespace-nowrap">{{ donation.dateTime }}</td>
              <td class="py-2 px-2 font-mono text-xs">{{ donation.receiptNumber }}</td>
              <td class="py-2 px-2">{{ donation.paymentMode }}</td>
              <td class="py-2 px-2">{{ donation.phoneNumber || '-' }}</td>
              <td class="py-2 px-2 text-green-700 font-bold">GHS {{ Number(donation.amountPaid).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
        <!-- ===== [New Feature] START ===== Total Section ===== -->
        <div class="flex justify-end mt-4 pr-2">
          <div class="bg-gray-100 rounded-lg px-6 py-3 text-lg font-bold text-green-800 shadow-sm">
            Total: GHS {{ totalAmount }}
          </div>
        </div>
        <!-- ===== [New Feature] END ===== -->
      </div>

      <!-- ===== Back Button ===== -->
      <div class="mt-8 flex justify-center">
        <router-link
          to="/"
          class="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Back to Home
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// ===== File-Level Documentation =====
/**
 * DonationHistoryView.vue
 * - Loads and displays all donation records from localForage
 * - Ghana-optimized: mobile-first, offline-first, clear comments
 * - Stratonea-compliant: full file, ready to copy-paste
 * - ===== [New Feature] START ===== Filter donations by current event to prevent mixing ===== [New Feature] END =====
 * - ===== [New Feature] START ===== Reorder columns and add total section ===== [New Feature] END =====
 */

// ===== Imports =====
import { ref, onMounted, computed } from 'vue'
import localforage from 'localforage'
import StratoneaLogo from '@/components/base/StratoneaLogo.vue'

// ===== Types & Interfaces =====
/**
 * Represents a single donation record.
 */
interface DonationRecord {
  deceasedName: string
  eventName: string
  donorName: string
  doneeName: string
  amountPaid: number
  paymentMode: string
  phoneNumber: string
  photoPreview?: string
  receiptNumber: string
  dateTime: string
}

// ===== Reactive State =====
const donations = ref<DonationRecord[]>([])
const isLoading = ref(true)

// ===== Store and load current event for filtering =====
const currentEvent = ref<{ eventName: string } | null>(null)

/**
 * Loads the current event from localStorage.
 * This is used to filter donations so only those for the active event are shown.
 */
function loadCurrentEvent() {
  try {
    const event = localStorage.getItem('funeral-donation-event')
    if (event) {
      currentEvent.value = JSON.parse(event)
    }
  } catch {
    currentEvent.value = null
  }
}

// ===== Filtered donations for current event only =====
/**
 * Only show donations for the current event to avoid mixing records.
 */
const filteredDonations = computed(() => {
  if (!currentEvent.value) return []
  return donations.value.filter(
    d => d.eventName === currentEvent.value!.eventName
  )
})

// ===== [New Feature] START ===== Total Amount Calculation =====
/**
 * Calculates the total amount for all filtered donations.
 */
const totalAmount = computed(() => {
  return filteredDonations.value
    .reduce((sum, d) => sum + Number(d.amountPaid), 0)
    .toFixed(2)
})
// ===== [New Feature] END =====

// ===== Helper Functions =====

/**
 * Loads all donation records from localForage.
 * Sets loading state and handles errors in simple English.
 */
async function loadDonations() {
  isLoading.value = true
  try {
    const result = await localforage.getItem<DonationRecord[]>('stratonea-funeral-donations')
    donations.value = Array.isArray(result) ? result : []
  } catch (e) {
    // Simple error message for Ghanaian users
    alert('Could not load donation records. Please try again.')
    donations.value = []
  } finally {
    isLoading.value = false
  }
}

// ===== Lifecycle =====
onMounted(() => {
  loadCurrentEvent()
  loadDonations()
})
</script>
