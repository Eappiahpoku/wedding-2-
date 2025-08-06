<!--
  ReceiptPreview.vue
  Live receipt preview with PDF/print actions.
  - Purple theme for preview/processing context
  - Real-time updates from form data
  - PDF download and print functionality (A4, fit-to-page, never cut off)
  - Stratonea-compliant, Ghana-optimized
  - Receipt ID: FDT-YYYY-MM-DD-AB12 (random, readable, per receipt)
  - All QR code logic removed as per request
-->

<template>
  <div class="bg-white rounded-lg shadow-md border-l-4  overflow-hidden">
    <!-- Section Header -->
    <div class="bg-purple-50 px-6 py-4 border-b border-purple-100">
      <h2 class="text-lg font-semibold text-purple-800 flex items-center">
        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Live Receipt Preview
      </h2>
      <p class="text-sm text-purple-600 mt-1">See how your receipt will look</p>
    </div>
    
    <!-- Receipt Content -->
    <div class="p-6">
      <div id="receipt-preview" class="bg-gradient-to-b from-white to-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm">
        <!-- Receipt Header -->
        <div class="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-6">
          <h3 class="text-xl font-bold text-gray-800 mb-1">
            {{ giftData.eventName || 'Event Name Will Appear Here' }}
          </h3>
          <p class="text-sm text-pink-600 uppercase tracking-wide">Official Wedding Gift Receipt</p>
          <div class="flex justify-center mt-2">
            <div class="h-1 w-16 bg-gradient-to-r from-pink-400 to-wedding rounded"></div>
          </div>
        </div>
        <!-- Gift Information with Photo -->
        <div class="flex items-start space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <img
              v-if="photoPreview"
              :src="photoPreview"
              alt="Gift Photo"
              class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-pink-200 shadow-lg"
            />
            <GiftPhotoPlaceholder v-else />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">Gift for</p>
            <h4 class="text-lg md:text-xl font-bold text-gray-800 leading-tight">
              {{ giftData.recipientName || 'Recipient Name Will Appear Here' }}
            </h4>
            <p class="text-xs text-gray-500 mt-1">Gift Description: <span class="font-semibold text-gray-700">{{ giftData.giftDescription || '-' }}</span></p>
          </div>
        </div>
        <!-- Receipt Details Grid -->
        <div class="space-y-3 text-sm mb-6">
          <div class="grid grid-cols-2 gap-4 p-3 bg-white rounded border">
            <div>
              <span class="text-gray-500 text-xs uppercase tracking-wide">Date & Time</span>
              <p class="font-medium text-gray-800">{{ currentDateTime }}</p>
            </div>
            <div>
              <span class="text-gray-500 text-xs uppercase tracking-wide">Receipt #</span>
              <p class="font-medium text-gray-800">{{ receiptNumber }}</p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-600">Giver:</span>
              <span class="font-medium text-gray-800">{{ giftData.giverName || '-' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-600">Recipient:</span>
              <span class="font-medium text-gray-800">{{ giftData.recipientName || '-' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-600">Contact:</span>
              <span class="font-medium text-gray-800">{{ giftData.phoneNumber || '-' }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-600">Payment:</span>
              <span class="font-medium text-gray-800">{{ giftData.paymentMode }}</span>
            </div>
          </div>
        </div>
        <!-- Gift Value Display -->
        <div class="bg-gradient-to-r from-pink-50 to-wedding-50 border border-pink-200 rounded-lg p-6 mb-6 text-center">
          <p class="text-sm text-pink-700 font-medium uppercase tracking-wide mb-2">Estimated Gift Value</p>
          <p class="text-3xl md:text-4xl font-bold text-pink-800">
            GHS {{ formattedAmount }}
          </p>
          <div class="flex justify-center mt-2">
            <div class="h-1 w-20 bg-gradient-to-r from-pink-400 to-wedding rounded"></div>
          </div>
        </div>
        <!-- Receipt Footer -->
        <div class="mt-6 pt-4 border-t border-dashed border-gray-300 text-center">
          <p class="text-xs text-gray-500">Thank you for your thoughtful wedding gift</p>
          <p class="text-xs text-gray-400 mt-1">Generated by Stratonea</p>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="px-6 pb-6 space-y-3">
      <button
        @click="downloadPDF"
        :disabled="isGeneratingPDF || !hasRequiredData"
        class="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md min-h-[48px] flex items-center justify-center"
      >
        <svg v-if="!isGeneratingPDF" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        <span v-if="isGeneratingPDF">Generating PDF...</span>
        <span v-else>Download PDF</span>
      </button>
      <button
        @click="printReceipt"
        :disabled="!hasRequiredData"
        class="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md min-h-[48px] flex items-center justify-center"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
        </svg>
        Print Receipt
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== [New Feature] START =====
// Import the new GiftPhotoPlaceholder for wedding context
import GiftPhotoPlaceholder from './GiftPhotoPlaceholder.vue'
// ===== [New Feature] END =====
// ===== File-Level Documentation =====
/**
 * ReceiptPreview.vue
 * - Live preview and PDF export for donation receipts
 * - Exports PDF using html2pdf.js (A4, fit-to-page, never cut off)
 * - Stratonea-compliant: mobile-first, Ghana-optimized, clear comments
 * - All QR code logic removed as per request
 */

// ===== Imports =====
import { ref, computed } from 'vue'
import localforage from 'localforage'
// ===== Types & Interfaces =====

// ===== Types & Interfaces =====
interface GiftData {
  giverName: string
  recipientName: string
  eventName: string
  giftDescription: string
  giftValue: number
  /**
   * paymentMode: How the gift was delivered (e.g., Cash, Mobile Money, Bank Transfer)
   * Used for record-keeping and offline/online reconciliation.
   */
  paymentMode: string
  phoneNumber: string
}


interface Props {
  giftData: GiftData
  photoPreview: string
}

const props = defineProps<Props>()

// ===== Reactive State =====
const isGeneratingPDF = ref(false)

// ===== Constants =====
const RECEIPT_ELEMENT_ID = 'receipt-preview'

// ===== Computed Properties =====
const formattedAmount = computed(() => {
  return props.giftData.giftValue.toFixed(2)
})

const currentDateTime = computed(() => {
  const now = new Date()
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  return `${formattedDate}, ${formattedTime}`
})

/**
 * Generates a user-friendly, random receipt ID.
 * Format: WGT-YYYY-MM-DD-AB12
 */
function generateReceiptId(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10) // YYYY-MM-DD
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('')
  const digits = Math.floor(10 + Math.random() * 90).toString()
  return `WGT-${date}-${letters}${digits}`
}

// ===== [New Feature] START =====
// Only generate a new receipt number when all required fields are filled and donation changes
const receiptNumber = ref<string>('')

import { watch } from 'vue'
watch(
  () => [
    props.giftData.giverName,
    props.giftData.recipientName,
    props.giftData.eventName,
    props.giftData.giftDescription,
    props.giftData.giftValue
  ],
  (vals, oldVals) => {
    if (
      props.giftData.giverName.trim() &&
      props.giftData.recipientName.trim() &&
      props.giftData.eventName.trim() &&
      props.giftData.giftDescription.trim() &&
      props.giftData.giftValue > 0
    ) {
      if (JSON.stringify(vals) !== JSON.stringify(oldVals)) {
        receiptNumber.value = generateReceiptId()
      }
    } else {
      receiptNumber.value = ''
    }
  },
  { immediate: true }
)
// ===== [New Feature] END =====

const hasRequiredData = computed(() => {
  return props.giftData.giverName.trim() !== '' &&
         props.giftData.recipientName.trim() !== '' &&
         props.giftData.eventName.trim() !== '' &&
         props.giftData.giftDescription.trim() !== '' &&
         props.giftData.giftValue > 0
})

// ===== [New Feature] START =====
/**
 * Saves the current donation to localForage for offline history.
 * Each donation includes all event and donor details, receipt number, and timestamp.
 */
async function saveGiftToHistory() {
  const GIFT_KEY = 'stratonea-wedding-gifts'
  // Build the gift record
  const record = {
    ...props.giftData,
    photoPreview: props.photoPreview || '',
    receiptNumber: receiptNumber.value,
    dateTime: currentDateTime.value
  }
  // Load existing gifts, add new one, and save back
  let gifts: any[] = []
  try {
    const existing = await localforage.getItem<any[]>(GIFT_KEY)
    if (Array.isArray(existing)) {
      gifts = existing
    }
    gifts.push(record)
    await localforage.setItem(GIFT_KEY, gifts)
    // Optionally: show a toast or message here
  } catch (e) {
    alert('Could not save gift record. Try again.')
  }
}
// ===== [New Feature] END =====

// ===== PDF Export Logic (html2pdf.js) =====
/**
 * Exports the receipt as a PDF, scaling to fit A4 page size.
 * Prevents clipping/cut-off for Ghanaian users.
 * Stratonea-compliant: mobile-first, clear comments, minimal code.
 */
async function downloadPDF() {
  if (!hasRequiredData.value) {
    alert('Please fill in all required fields before generating PDF')
    return
  }

  isGeneratingPDF.value = true

  try {
    // Dynamically import html2pdf.js for bundle size optimization
    const html2pdf = (await import('html2pdf.js')).default

    const receiptElement = document.getElementById(RECEIPT_ELEMENT_ID)
    if (!receiptElement) {
      throw new Error('Receipt element not found')
    }

    const giverName = props.giftData.giverName.replace(/[^a-zA-Z0-9]/g, '_')
    const recipientName = props.giftData.recipientName.replace(/[^a-zA-Z0-9]/g, '_')
    const filename = `Receipt_${receiptNumber.value}_${giverName}_${recipientName}.pdf`

    // Set PDF options for A4, portrait, fit-to-page, and 10mm margins
    const opt = {
      margin:       [10, 10, 10, 10], // 10mm margins
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#fff' },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    }

    // Export as PDF, scaling to fit
    await html2pdf().set(opt).from(receiptElement).save()

    // Save gift to localForage after successful PDF generation
    await saveGiftToHistory()
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Could not generate PDF. Please check your internet connection and try again.')
  } finally {
    isGeneratingPDF.value = false
  }
}

// ===== Print Logic =====
function printReceipt() {
  if (!hasRequiredData.value) {
    alert('Please fill in all required fields before printing')
    return
  }
  window.print()
}
</script>