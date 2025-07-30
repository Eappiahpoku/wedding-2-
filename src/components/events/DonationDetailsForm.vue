<!--
  DonationDetailsForm.vue
  Form section for donation details (donor, donee, amount, payment method)
  - Green theme for money/giving context
  - Ghana-specific payment methods
  - Mobile-first form layout with responsive grid
-->

<template>
  <div class="bg-white rounded-lg shadow-md border-l-4 border-[white] overflow-hidden">
    <!-- Section Header -->
    <div class="bg-green-50 px-6 py-4 border-b border-green-100">
      <h2 class="text-lg font-semibold text-green-800 flex items-center">
        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/>
          <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/>
          <path d="m2 13 6 6"/>
        </svg>
        Donation Details
      </h2>
      <p class="text-sm text-green-600 mt-1">Donor information and payment details</p>
    </div>

    <!-- Donation Form Fields -->
    <div class="p-6 space-y-5">
      <!-- Donor Name -->
      <div>
        <label for="donor-name" class="block text-sm font-medium text-gray-700 mb-2">
          Name of Donor *
        </label>
        <input
          id="donor-name"
          :value="modelValue.donorName"
          @input="updateField('donorName', $event)"
          type="text"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition-colors"
          placeholder="Enter donor's full name"
          required
        />
        <p class="text-xs text-gray-500 mt-1">Person making the donation</p>
      </div>

      <!-- Donee Name -->
      <div>
        <label for="donee-name" class="block text-sm font-medium text-gray-700 mb-2">
          Name of Donee (Receiver) *
        </label>
        <input
          id="donee-name"
          :value="modelValue.doneeName"
          @input="updateField('doneeName', $event)"
          type="text"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition-colors"
          placeholder="Enter receiver's full name"
          required
        />
        <p class="text-xs text-gray-500 mt-1">Person or family receiving the donation</p>
      </div>

      <!-- Amount and Payment Mode Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Amount -->
        <div>
          <label for="amount-paid" class="block text-sm font-medium text-gray-700 mb-2">
            Amount Donated (GHS) *
          </label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-base">₵</span>
            <input
              id="amount-paid"
              :value="modelValue.amountPaid || ''"
              @input="updateNumberField('amountPaid', $event)"
              type="number"
              min="0"
              step="0.01"
              class="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition-colors"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <!-- Payment Mode -->
        <div>
          <label for="payment-mode" class="block text-sm font-medium text-gray-700 mb-2">
            Mode of Payment
          </label>
          <select
            id="payment-mode"
            :value="modelValue.paymentMode"
            @change="updateField('paymentMode', $event)"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition-colors"
          >
            <option value="Cash">Cash</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cheque">Cheque</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <!-- Phone Number -->
      <div>
        <label for="phone-number" class="block text-sm font-medium text-gray-700 mb-2">
          Donor Phone Number
        </label>
        <input
          id="phone-number"
          :value="modelValue.phoneNumber"
          @input="updateField('phoneNumber', $event)"
          type="tel"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition-colors"
          placeholder="e.g., 024 XXX XXXX"
        />
        <p class="text-xs text-gray-500 mt-1">Optional - for contact purposes</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
interface DonationData {
  donorName: string
  doneeName: string
  amountPaid: number
  paymentMode: string
  phoneNumber: string
}

interface Props {
  modelValue: DonationData
}

// ===== Props & Emits =====
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DonationData): void
}>()

// ===== Helper Functions =====
function updateField(field: keyof DonationData, event: Event) {
  const target = event.target as HTMLInputElement | HTMLSelectElement
  const updatedValue = {
    ...props.modelValue,
    [field]: target.value
  }
  emit('update:modelValue', updatedValue)
}

function updateNumberField(field: keyof DonationData, event: Event) {
  const target = event.target as HTMLInputElement
  const numericValue = parseFloat(target.value) || 0
  const updatedValue = {
    ...props.modelValue,
    [field]: numericValue
  }
  emit('update:modelValue', updatedValue)
}
</script>