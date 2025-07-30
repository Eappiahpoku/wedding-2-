<!--
  ReceiptPreview.vue
  Live receipt preview with QR code and action buttons
  - Purple theme for preview/processing context
  - Real-time updates from form data
  - PDF download and print functionality
  - QR code generation with donation details
  - Stratonea-compliant, Ghana-optimized
  - Receipt ID: FDT-YYYY-MM-DD-AB12 (random, readable, per receipt)
-->

<template>
  <div class="bg-white rounded-lg shadow-md border-l-4 border-[whiteReceipt ] overflow-hidden">
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
            {{ donationData.eventName || 'Event Name Will Appear Here' }}
          </h3>
          <p class="text-sm text-gray-500 uppercase tracking-wide">Official Donation Receipt</p>
          <div class="flex justify-center mt-2">
            <div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
          </div>
        </div>

        <!-- Deceased Information with Photo -->
        <div class="flex items-start space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
  <!-- Show photo if available, else show SVG placeholder -->
  <div>
    <img
      v-if="photoPreview"
      :src="photoPreview"
      alt="Deceased"
      class="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-gray-200 shadow-lg"
    />
    <DeceasedPhotoPlaceholder v-else />
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-gray-600 mb-1">In loving memory of</p>
    <h4 class="text-lg md:text-xl font-bold text-gray-800 leading-tight">
      {{ donationData.deceasedName || 'Deceased Name Will Appear Here' }}
    </h4>
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
              <span class="text-gray-600">Donor:</span>
              <span class="font-medium text-gray-800">{{ donationData.donorName || '-' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-600">Receiver:</span>
              <span class="font-medium text-gray-800">{{ donationData.doneeName || '-' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-100">
              <span class="text-gray-600">Contact:</span>
              <span class="font-medium text-gray-800">{{ donationData.phoneNumber || '-' }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-600">Payment:</span>
              <span class="font-medium text-gray-800">{{ donationData.paymentMode }}</span>
            </div>
          </div>
        </div>

        <!-- Amount Display -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
          <p class="text-sm text-green-700 font-medium uppercase tracking-wide mb-2">Total Amount Donated</p>
          <p class="text-3xl md:text-4xl font-bold text-green-800">
            GHS {{ formattedAmount }}
          </p>
          <div class="flex justify-center mt-2">
            <div class="h-1 w-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded"></div>
          </div>
        </div>

        <!-- QR Code
        <div class="text-center">
          <div class="inline-block p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div
              ref="qrcodeContainer"
              class="flex items-center justify-center min-h-[100px]"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-2 uppercase tracking-wide">Scan for verification</p>
        </div> -->

        <!-- Receipt Footer -->
        <div class="mt-6 pt-4 border-t border-dashed border-gray-300 text-center">
          <p class="text-xs text-gray-500">Thank you for your generous donation</p>
          <p class="text-xs text-gray-400 mt-1">Generated by <a h></a> Stratonea</p>
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
// ===== Types & Interfaces =====
/**
 * Props for ReceiptPreview
 * - donationData: All donation fields
 * - photoPreview: string (URL)
 */
import { ref, computed, watch, onMounted, nextTick } from 'vue'
// ===== [New Feature] START =====
import localforage from 'localforage' // For offline donation history
import DeceasedPhotoPlaceholder from './DeceasedPhotoPlaceholder.vue'
// ===== [New Feature] END =====

interface DonationData {
  deceasedName: string
  eventName: string
  donorName: string
  doneeName: string
  amountPaid: number
  paymentMode: string
  phoneNumber: string
}

interface Props {
  donationData: DonationData
  photoPreview: string
}

const props = defineProps<Props>()

// ===== Reactive State =====
const isGeneratingPDF = ref(false)
const qrcodeContainer = ref<HTMLDivElement | null>(null)

// ===== QR Code Management =====
let qrcodeInstance: any = null

// ===== Constants =====
// const defaultPhoto = 'https://placehold.co/100x100/EFEFEF/333333?text=Photo'

// ===== Computed Properties =====
const formattedAmount = computed(() => {
  return props.donationData.amountPaid.toFixed(2)
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
 * Format: FDT-YYYY-MM-DD-AB12
 */
function generateReceiptId(): string {
  const now = new Date()
  const date = now.toISOString().slice(0, 10) // YYYY-MM-DD
  const letters = Array.from({ length: 2 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join('')
  const digits = Math.floor(10 + Math.random() * 90).toString()
  return `FDT-${date}-${letters}${digits}`
}

// ===== [New Feature] START =====
// Only generate a new receipt number when all required fields are filled and donation changes
const receiptNumber = ref<string>('')

watch(
  () => [
    props.donationData.deceasedName,
    props.donationData.eventName,
    props.donationData.donorName,
    props.donationData.doneeName,
    props.donationData.amountPaid
  ],
  (vals, oldVals) => {
    if (
      props.donationData.deceasedName.trim() &&
      props.donationData.eventName.trim() &&
      props.donationData.donorName.trim() &&
      props.donationData.doneeName.trim() &&
      props.donationData.amountPaid > 0
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
  return props.donationData.deceasedName.trim() !== '' && 
         props.donationData.eventName.trim() !== '' && 
         props.donationData.donorName.trim() !== '' && 
         props.donationData.doneeName.trim() !== '' && 
         props.donationData.amountPaid > 0
})

const qrCodeText = computed(() => {
  return `Donation Receipt ${receiptNumber.value}
Donor: ${props.donationData.donorName}
Amount: GHS ${formattedAmount.value}
Event: ${props.donationData.eventName}
Date: ${currentDateTime.value}
Receiver: ${props.donationData.doneeName}`.trim().replace(/\s+/g, ' ')
})

// ===== [New Feature] START =====
/**
 * Saves the current donation to localForage for offline history.
 * Each donation includes all event and donor details, receipt number, and timestamp.
 */
async function saveDonationToHistory() {
  const DONATION_KEY = 'stratonea-funeral-donations'
  // Build the donation record
  const record = {
    ...props.donationData,
    photoPreview: props.photoPreview || '',
    receiptNumber: receiptNumber.value,
    dateTime: currentDateTime.value
  }
  // Load existing donations, add new one, and save back
  let donations: any[] = []
  try {
    const existing = await localforage.getItem<any[]>(DONATION_KEY)
    if (Array.isArray(existing)) {
      donations = existing
    }
    donations.push(record)
    await localforage.setItem(DONATION_KEY, donations)
    // Optionally: show a toast or message here
  } catch (e) {
    // Simple error message for Ghanaian users
    alert('Could not save donation record. Try again.')
  }
}
// ===== [New Feature] END =====

// ===== QR Code Functions =====
async function updateQRCode() {
  await nextTick()
  
  if (!qrcodeContainer.value) return

  try {
    if (qrcodeInstance && qrcodeInstance.makeCode) {
      qrcodeInstance.makeCode(qrCodeText.value)
    } else {
      qrcodeContainer.value.innerHTML = ''
      
      if (window.QRCode) {
        qrcodeInstance = new window.QRCode(qrcodeContainer.value, {
          text: qrCodeText.value,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: window.QRCode.CorrectLevel.H
        })
      }
    }
  } catch (error) {
    console.warn('Could not generate QR code:', error)
    qrcodeInstance = null
    if (qrcodeContainer.value) {
      qrcodeContainer.value.innerHTML = '<div class="text-xs text-gray-400 p-4">QR code will appear here</div>'
    }
  }
}

// ===== Action Functions =====
async function downloadPDF() {
  if (!hasRequiredData.value) {
    alert('Please fill in all required fields before generating PDF')
    return
  }

  isGeneratingPDF.value = true
  
  try {
    if (!window.html2canvas || !window.jspdf) {
      throw new Error('PDF libraries not loaded')
    }
    
    const receiptElement = document.getElementById('receipt-preview')
    if (!receiptElement) {
      throw new Error('Receipt element not found')
    }

    const deceasedName = props.donationData.deceasedName.replace(/[^a-zA-Z0-9]/g, '_')
    const donorName = props.donationData.donorName.replace(/[^a-zA-Z0-9]/g, '_')
    const filename = `Receipt_${receiptNumber.value}_${deceasedName}_${donorName}.pdf`

    const canvas = await window.html2canvas(receiptElement, { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    const imgData = canvas.toDataURL('image/png', 0.95)
    
    const { jsPDF } = window.jspdf
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })
    
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth - 20
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    const x = 10
    const y = Math.max(10, (pdfHeight - imgHeight) / 2)
    
    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
    pdf.save(filename)

    // ===== [New Feature] START =====
    // Save donation to localForage after successful PDF generation
    await saveDonationToHistory()
    // ===== [New Feature] END =====

  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Could not generate PDF. Please check your internet connection and try again.')
  } finally {
    isGeneratingPDF.value = false
  }
}

function printReceipt() {
  if (!hasRequiredData.value) {
    alert('Please fill in all required fields before printing')
    return
  }
  
  window.print()
}

function loadExternalLibraries() {
  if (!window.QRCode) {
    const qrScript = document.createElement('script')
    qrScript.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
    qrScript.onload = updateQRCode
    document.head.appendChild(qrScript)
  }
  
  if (!window.html2canvas) {
    const html2canvasScript = document.createElement('script')
    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    document.head.appendChild(html2canvasScript)
  }
  
  if (!window.jspdf) {
    const jspdfScript = document.createElement('script')
    jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    document.head.appendChild(jspdfScript)
  }
}

// ===== Watchers & Lifecycle =====
watch([() => props.donationData, currentDateTime], updateQRCode, { deep: true })

onMounted(() => {
  updateQRCode()
  loadExternalLibraries()
})

// ===== Type Declarations =====
declare global {
  interface Window {
    QRCode: any
    html2canvas: any
    jspdf: any
  }
}
</script>