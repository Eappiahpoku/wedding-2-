<!--
  GiftDetailsForm.vue
  - Mobile-first, declustered wedding gift entry form
  - Ghana-optimized: touch targets, offline-friendly, clear comments
  - All input fields full width and stacked on mobile
  - "Gift Value" and "Payment Mode" share a row only on desktop (md+)
  - Extra spacing for labels and inputs for clarity
  - Inputs never overflow main border
-->

<template>
 
  <div class="bg-white rounded-lg shadow-md border-l-4  overflow-hidden p-4">
    <!-- Section Header -->
   <!-- Gift Information Header fills to edge of card -->
<div class="bg-wedding-50 border-b border-wedding-100 rounded-t-lg -mx-4 -mt-4 px-4 py-4">
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
    
    <!-- ===== [New Feature] START ===== -->
<form class="grid grid-cols-1 gap-y-6 md:gap-y-8" autocomplete="off">
  <!-- Giver Name (always full width) -->
  <div>
    <label for="giverName" class="block text-sm font-medium text-gray-700 mb-4">Giver Name</label>
    <input
      id="giverName"
      v-model="localGift.giverName"
      type="text"
      required
      class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-wedding-500 focus:ring-wedding-500 text-base bg-white shadow-sm"
      placeholder="Enter giver's name"
    />
  </div>
  <!-- Recipient Name (always full width) -->
  <div>
    <label for="recipientName" class="block text-sm font-medium text-gray-700 mb-4">Recipient Name</label>
    <input
      id="recipientName"
      v-model="localGift.recipientName"
      type="text"
      required
      class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-wedding-500 focus:ring-wedding-500 text-base bg-white shadow-sm"
      placeholder="Enter recipient's name"
    />
  </div>
  <!-- Gift Description (always full width) -->
  <div>
    <label for="giftDescription" class="block text-sm font-medium text-gray-700 mb-4">Gift Description</label>
    <input
      id="giftDescription"
      v-model="localGift.giftDescription"
      type="text"
      required
      class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-wedding-500 focus:ring-wedding-500 text-base bg-white shadow-sm"
      placeholder="Describe the gift (e.g., Blender, Cash)"
    />
  </div>
  <!-- Phone Number (always full width) -->
  <div>
    <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-4">Phone Number</label>
    <input
      id="phoneNumber"
      v-model="localGift.phoneNumber"
      type="tel"
      required
      class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-wedding-500 focus:ring-wedding-500 text-base bg-white shadow-sm"
      placeholder="e.g., 024XXXXXXX"
    />
  </div>
  <!-- Gift Value & Payment Mode: stacked on mobile, side-by-side on desktop -->
  <div class="md:grid md:grid-cols-2 md:gap-x-6">
    <div>
      <label for="giftValue" class="block text-sm font-medium text-gray-700 mb-4">Gift Value (GHS)</label>
      <input
        id="giftValue"
        v-model.number="localGift.giftValue"
        type="number"
        min="0"
        step="0.01"
        required
        class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-wedding-500 focus:ring-wedding-500 text-base bg-white shadow-sm"
        placeholder="Enter value (if cash)"
      />
    </div>
    <div>
      <label for="paymentMode" class="block text-sm font-medium text-gray-700 mb-4">Payment Mode</label>
      <select
        id="paymentMode"
        v-model="localGift.paymentMode"
        required
        class="block w-full px-3 py-3 rounded-lg border border-gray-300 focus:border-wedding-500 focus:ring-wedding-500 text-base bg-white shadow-sm"
      >
        <option value="Cash">Cash</option>
        <option value="Mobile Money">Mobile Money</option>
        <option value="Item">Item</option>
      </select>
    </div>
  </div>
</form>
    <!-- ===== [New Feature] END ===== -->
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * GiftData: Structure for a single wedding gift entry
 * - All fields are required for receipt and record-keeping
 */
interface GiftData {
  /**
   * giverName: Name of the person giving the gift
   */
  giverName: string
  /**
   * recipientName: Name of the person or couple receiving the gift
   */
  recipientName: string
  /**
   * giftDescription: Description of the gift (e.g., Blender, Cash, Gift Card)
   */
  giftDescription: string
  /**
   * phoneNumber: Contact number of the giver (for follow-up or thanks)
   */
  phoneNumber: string
  /**
   * giftValue: Estimated value of the gift in GHS (for record-keeping)
   */
  giftValue: number
  /**
   * paymentMode: How the gift was delivered (e.g., Cash, Mobile Money, Item)
   */
  paymentMode: string
}

// ===== Props & Emits =====
import { reactive, watch } from 'vue'
const props = defineProps<{ modelValue: GiftData }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: GiftData): void }>()

// ===== Local State (Controlled by Parent) =====
const localGift = reactive<GiftData>({ ...props.modelValue })

// Watch for changes from parent and update local state
watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(localGift, newVal)
  }
)

// Watch for changes in localGift and emit to parent
watch(
  localGift,
  (newVal) => {
    emit('update:modelValue', { ...newVal })
  },
  { deep: true }
)
</script>