<!--
  HomeView.vue
  Main page for the Funeral Donation Tracker app.
  - Composed of reusable components
  - Stratonea-compliant: Mobile-first, responsive, Ghana-optimized
  - Manages state and data flow between components
  - Handles local storage for offline persistence
  - ===== [Layout Change] START ===== Responsive vertical stacking, touch targets, and padding ===== [Layout Change] END =====
-->

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
    <!-- ===== App Header (Stratonea Pattern) ===== -->
    

    <main class="flex-1 w-full max-w-lg mx-auto px-2 sm:px-4 py-4">
      <!-- Page Title and Description -->
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-700">Create New Donation</h1>
        <p class="text-gray-500 mt-2">Fill in the details below to generate an official donation receipt</p>
      </div>

      <!-- ===== [Layout Change] START ===== Main Layout: Responsive Vertical Stack ===== -->
      <div class="flex flex-col gap-6">
        <!-- ===== Form Sections ===== -->
        <div class="flex flex-col gap-4">
          <!-- Event Details Form -->
          <EventDetailsForm 
            v-model="eventData"
            v-model:photo-preview="photoPreview"
          />

          <!-- Donation Details Form -->
          <DonationDetailsForm v-model="donationDetails" />
        </div>

        <!-- ===== Live Receipt Preview ===== -->
        <div>
          <ReceiptPreview 
            :donation-data="combinedDonationData"
            :photo-preview="photoPreview"
          />
        </div>
      </div>
      <!-- ===== [Layout Change] END ===== -->

      <!-- Offline Status Indicator -->
      <div class="mt-6">
        <OfflineIndicator />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// ===== Imports =====
import { ref, computed, watch, onMounted } from 'vue'
import EventDetailsForm from '@/components/events/EventDetailsForm.vue'
import DonationDetailsForm from '@/components/events/DonationDetailsForm.vue'
import ReceiptPreview from '@/components/events/ReceiptPreview.vue'
import OfflineIndicator from '@/components/events/OfflineIndicator.vue'

// ===== Types & Interfaces =====
interface EventData {
  eventName: string
  deceasedName: string
}

interface DonationDetails {
  donorName: string
  doneeName: string
  amountPaid: number
  paymentMode: string
  phoneNumber: string
}

interface CombinedDonationData extends EventData, DonationDetails {}

// ===== Reactive State =====
const eventData = ref<EventData>({
  eventName: '',
  deceasedName: ''
})

const donationDetails = ref<DonationDetails>({
  donorName: '',
  doneeName: '',
  amountPaid: 0,
  paymentMode: 'Cash',
  phoneNumber: ''
})

const photoPreview = ref<string>('')

// ===== Computed Properties =====
const combinedDonationData = computed<CombinedDonationData>(() => ({
  ...eventData.value,
  ...donationDetails.value
}))

// ===== Local Storage Functions =====
/**
 * Saves form data and photo preview to localStorage for offline support.
 */
function saveToLocalStorage() {
  try {
    localStorage.setItem('funeral-donation-event', JSON.stringify(eventData.value))
    localStorage.setItem('funeral-donation-details', JSON.stringify(donationDetails.value))
    localStorage.setItem('funeral-donation-photo', photoPreview.value)
  } catch (error) {
    console.warn('Could not save to localStorage:', error)
  }
}

/**
 * Loads form data and photo preview from localStorage on mount.
 */
function loadFromLocalStorage() {
  try {
    const savedEventData = localStorage.getItem('funeral-donation-event')
    const savedDonationDetails = localStorage.getItem('funeral-donation-details')
    const savedPhoto = localStorage.getItem('funeral-donation-photo')
    
    if (savedEventData) {
      eventData.value = { ...eventData.value, ...JSON.parse(savedEventData) }
    }
    if (savedDonationDetails) {
      donationDetails.value = { ...donationDetails.value, ...JSON.parse(savedDonationDetails) }
    }
    if (savedPhoto) {
      photoPreview.value = savedPhoto
    }
  } catch (error) {
    console.warn('Could not load from localStorage:', error)
  }
}

// ===== Watchers =====
// Auto-save data when it changes
watch(eventData, saveToLocalStorage, { deep: true })
watch(donationDetails, saveToLocalStorage, { deep: true })
watch(photoPreview, saveToLocalStorage)

// ===== Lifecycle =====
onMounted(() => {
  // Load saved data on component mount
  loadFromLocalStorage()
})
</script>

<style scoped>
/* ===== Print-specific styles ===== */
@media print {
  body * {
    visibility: hidden;
  }
  #receipt-preview,
  #receipt-preview * {
    visibility: visible;
  }
  #receipt-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    box-shadow: none !important;
    border: none !important;
  }
}

/* Enhanced loading states for images */
img {
  transition: all 0.3s ease;
}
img[src=""] {
  opacity: 0.5;
  filter: blur(1px);
}

/* Smooth focus transitions for form inputs */
input:focus,
select:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Button hover effects */
button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
button:active:not(:disabled) {
  transform: translateY(0);
}
</style>