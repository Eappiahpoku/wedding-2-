<!--
  HomeView.vue
  Main page for the Wedding Gift Tracker app.
  - Composed of reusable components
  - Stratonea-compliant: Mobile-first, responsive, Ghana-optimized
  - Manages state and data flow between components
  - Handles local storage for offline persistence
  - All context updated for wedding gift tracker
  - ===== [Layout Change] START ===== Responsive vertical stacking, touch targets, and padding ===== [Layout Change] END =====
  <!-- ===== [New Feature] START ===== -->
-->

<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
    <!-- ===== App Header (Stratonea Pattern) ===== -->
    

    <main class="flex-1 w-full max-w-lg mx-auto px-2 sm:px-4 py-4">
      <!-- Page Title and Description -->
      <div class="text-center mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-700">Create New Wedding Gift Record</h1>
        <p class="text-gray-500 mt-2">Fill in the details below to generate an official wedding gift receipt</p>
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

          <!-- Gift Details Form -->
          <DonationDetailsForm v-model="giftDetails" />
        </div>

        <!-- ===== Live Receipt Preview ===== -->
        <div>
          <ReceiptPreview 
            :gift-data="combinedGiftData"
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
import DonationDetailsForm from '@/components/events/GiftsDetailsForm.vue'
import ReceiptPreview from '@/components/events/ReceiptPreview.vue'
import OfflineIndicator from '@/components/events/OfflineIndicator.vue'

// ===== Types & Interfaces =====
// ===== Types & Interfaces =====
/**
 * EventData: Structure for event details (wedding context)
 * GiftDetails: Structure for gift details (wedding context)
 * CombinedGiftData: Combines event and gift details for preview/receipt
 * <!-- ===== [New Feature] START ===== -->
 */
interface EventData {
  /**
   * eventName: Name of the wedding event (e.g., Wedding Ceremony, Engagement)
   */
  eventName: string
  /**
   * recipientName: Name of the person or couple receiving the gift
   */
  recipientName: string
}

interface GiftDetails {
  /**
   * giverName: Name of the person giving the gift
   */
  giverName: string
  /**
   * recipientName: Name of the person or couple receiving the gift (should match eventData.recipientName)
   */
  recipientName: string
  /**
   * giftDescription: Description of the gift (e.g., Blender, Cash, Gift Card)
   */
  giftDescription: string
  /**
   * giftValue: Estimated value of the gift in GHS (for record-keeping)
   */
  giftValue: number
  /**
   * paymentMode: How the gift was delivered (e.g., Cash, Mobile Money, Bank Transfer)
   */
  paymentMode: string
  /**
   * phoneNumber: Contact number of the giver (for follow-up or thanks)
   */
  phoneNumber: string
}

interface CombinedGiftData extends EventData, GiftDetails {}

// ===== Reactive State =====
const eventData = ref<EventData>({
  eventName: '',
  recipientName: ''
})

const giftDetails = ref<GiftDetails>({
  giverName: '',
  recipientName: '',
  giftDescription: '',
  giftValue: 0,
  paymentMode: 'Cash',
  phoneNumber: ''
})

const photoPreview = ref<string>('')

// ===== Computed Properties =====
const combinedGiftData = computed<CombinedGiftData>(() => ({
  ...eventData.value,
  ...giftDetails.value
}))

// ===== Local Storage Functions =====
/**
 * Saves form data and photo preview to localStorage for offline support (wedding context).
 */
function saveToLocalStorage() {
  try {
    localStorage.setItem('wedding-event', JSON.stringify(eventData.value))
    localStorage.setItem('wedding-gift-details', JSON.stringify(giftDetails.value))
    localStorage.setItem('wedding-gift-photo', photoPreview.value)
  } catch (error) {
    console.warn('Could not save to localStorage:', error)
  }
}

/**
 * Loads form data and photo preview from localStorage on mount (wedding context).
 */
function loadFromLocalStorage() {
  try {
    const savedEventData = localStorage.getItem('wedding-event')
    const savedGiftDetails = localStorage.getItem('wedding-gift-details')
    const savedPhoto = localStorage.getItem('wedding-gift-photo')
    
    if (savedEventData) {
      eventData.value = { ...eventData.value, ...JSON.parse(savedEventData) }
    }
    if (savedGiftDetails) {
      giftDetails.value = { ...giftDetails.value, ...JSON.parse(savedGiftDetails) }
    }
    if (savedPhoto) {
      photoPreview.value = savedPhoto
    }
  } catch (error) {
    console.warn('Could not load from localStorage:', error)
  }
}

// ===== Watchers =====
// Auto-save data when it changes (wedding context)
watch(eventData, saveToLocalStorage, { deep: true })
watch(giftDetails, saveToLocalStorage, { deep: true })
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