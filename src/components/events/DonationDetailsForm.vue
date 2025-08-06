<!--
  GiftDetailsForm.vue
  - Mobile-first form layout for wedding gift entry
  - Ghana-optimized: touch targets, offline-friendly, clear comments
-->
<template>
  <div class="bg-white rounded-lg shadow-md border-l-4 border-wedding-500 overflow-hidden">
    <!-- Section Header -->
    <div class="bg-wedding-50 px-6 py-4 border-b border-wedding-100">
      <h2 class="text-lg font-semibold text-wedding-800 flex items-center">
        <!-- Gift Icon -->
        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="8" width="18" height="13" rx="2" fill="none" stroke="#FF2E84" stroke-width="2"/>
          <path d="M12 8V21" stroke="#FF2E84" stroke-width="2"/>
          <path d="M3 12h18" stroke="#FF2E84" stroke-width="2"/>
          <path d="M7.5 8C6 8 4 6.5 4 5.5C4 4.5 6 4 7.5 5.5C9 7 7.5 8 7.5 8Z" stroke="#FF2E84" stroke-width="2"/>
          <path d="M16.5 8C18 8 20 6.5 20 5.5C20 4.5 18 4 16.5 5.5C15 7 16.5 8 16.5 8Z" stroke="#FF2E84" stroke-width="2"/>
        </svg>
        Gift Information
      </h2>
      <p class="text-sm text-wedding-600 mt-1">Giver, recipient, and gift details</p>
    </div>
    <!-- ===== Gift Details Form ===== -->
    <form class="grid gap-4 md:grid-cols-2" autocomplete="off">
      <!-- Giver Name -->
      <div>
        <label for="giverName" class="block text-sm font-medium text-gray-700">Giver Name</label>
        <input id="giverName" v-model="gift.giverName" type="text" required class="mt-1 block w-full rounded-lg border-gray-300 focus:border-wedding-500 focus:ring-wedding-500" placeholder="Enter giver's name" />
      </div>
      <!-- Recipient Name -->
      <div>
        <label for="recipientName" class="block text-sm font-medium text-gray-700">Recipient Name</label>
        <input id="recipientName" v-model="gift.recipientName" type="text" required class="mt-1 block w-full rounded-lg border-gray-300 focus:border-wedding-500 focus:ring-wedding-500" placeholder="Enter recipient's name" />
      </div>
      <!-- Gift Description -->
      <div class="md:col-span-2">
        <label for="giftDescription" class="block text-sm font-medium text-gray-700">Gift Description</label>
        <input id="giftDescription" v-model="gift.giftDescription" type="text" required class="mt-1 block w-full rounded-lg border-gray-300 focus:border-wedding-500 focus:ring-wedding-500" placeholder="Describe the gift (e.g., Blender, Cash)" />
      </div>
      <!-- Phone Number -->
      <div>
        <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input id="phoneNumber" v-model="gift.phoneNumber" type="tel" required class="mt-1 block w-full rounded-lg border-gray-300 focus:border-wedding-500 focus:ring-wedding-500" placeholder="e.g., 024XXXXXXX" />
      </div>
      <!-- Gift Value -->
      <div>
        <label for="giftValue" class="block text-sm font-medium text-gray-700">Gift Value (GHS)</label>
        <input id="giftValue" v-model.number="gift.giftValue" type="number" min="0" step="0.01" required class="mt-1 block w-full rounded-lg border-gray-300 focus:border-wedding-500 focus:ring-wedding-500" placeholder="Enter value (if cash)" />
      </div>
      <!-- Payment Mode -->
      <div class="md:col-span-2">
        <label for="paymentMode" class="block text-sm font-medium text-gray-700">Payment Mode</label>
        <select id="paymentMode" v-model="gift.paymentMode" required class="mt-1 block w-full rounded-lg border-gray-300 focus:border-wedding-500 focus:ring-wedding-500">
          <option value="Cash">Cash</option>
          <option value="Mobile Money">Mobile Money</option>
          <option value="Item">Item</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
interface GiftData {
  giverName: string
  recipientName: string
  giftDescription: string
  phoneNumber: string
  giftValue: number
  paymentMode: string
}

// ===== Local State =====
import { reactive } from 'vue'
const gift = reactive<GiftData>({
  giverName: '',
  recipientName: '',
  giftDescription: '',
  phoneNumber: '',
  giftValue: 0,
  paymentMode: 'Cash'
})
</script>