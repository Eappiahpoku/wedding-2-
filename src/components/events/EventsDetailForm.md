<!--
  EventDetailsForm.vue
  Form section for event details (deceased info, event name, photo)
  - Blue theme for formal/ceremony context
  - Prominent photo upload
  - Mobile-first form layout
  - Stratonea-compliant: Save/Load/Clear event for Ghanaian workflow
-->

<template>
  <div class="bg-white rounded-lg shadow-md border-l-4 border-[white] overflow-hidden">
    <!-- Section Header -->
    <div class="bg-blue-50 px-6 py-4 border-b border-blue-100">
      <h2 class="text-lg font-semibold text-blue-800 flex items-center">
        <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2"/>
          <path d="M16 2v4"/>
          <path d="M3 10h18"/>
          <path d="M8 2v4"/>
          <path d="M17 14h-6"/>
          <path d="M13 18H7"/>
          <path d="M7 14h.01"/>
          <path d="M17 18h.01"/>
        </svg>
        Event Details
      </h2>
      <p class="text-sm text-blue-600 mt-1">Information about the funeral event</p>
    </div>
    
    <!-- Event Form Fields -->
    <div class="p-6 space-y-5">
      <!-- Photo Upload - Made Prominent -->
      <div class="text-center">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          Photo of Deceased
        </label>
        <div class="flex flex-col items-center">
          <!-- Photo Preview -->
          <div class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 mb-4 shadow-lg">
            <img
              :src="photoPreview || defaultPhoto"
              alt="Deceased"
              class="w-full h-full object-cover"
            />
          </div>
          <!-- File Input -->
          <input
            id="deceased-photo"
            type="file"
            accept="image/*"
            @change="handlePhotoUpload"
            class="w-full max-w-xs text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 file:cursor-pointer"
          />
        </div>
      </div>

      <!-- Event Name -->
      <div>
        <label for="event-name" class="block text-sm font-medium text-gray-700 mb-2">
          Event Name *
        </label>
        <input
          id="event-name"
          :value="modelValue.eventName"
          @input="updateField('eventName', $event)"
          type="text"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-colors"
          placeholder="e.g., Funeral Service, Memorial Service"
          required
        />
      </div>

      <!-- Deceased Name -->
      <div>
        <label for="deceased-name" class="block text-sm font-medium text-gray-700 mb-2">
          Name of Deceased *
        </label>
        <input
          id="deceased-name"
          :value="modelValue.deceasedName"
          @input="updateField('deceasedName', $event)"
          type="text"
          class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-colors"
          placeholder="Enter the full name of the deceased"
          required
        />
      </div>

      <!-- ===== [New Feature] START ===== -->
      <!-- Save/Load/Clear Event Buttons for Ghanaian workflow -->
      <div class="flex flex-col sm:flex-row gap-2 pt-2">
        <button
          type="button"
          class="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          @click="saveEvent"
        >
          Save Event
        </button>
        <button
          type="button"
          class="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          @click="loadEvent"
        >
          Load Event
        </button>
        <button
          type="button"
          class="flex-1 bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
          @click="clearEvent"
        >
          Clear Event
        </button>
      </div>
      <div v-if="eventMessage" class="mt-2 text-center text-sm font-medium" :class="eventMessageColor">
        {{ eventMessage }}
      </div>
      <!-- ===== [New Feature] END ===== -->
    </div>
  </div>
</template>

<script setup lang="ts">
// ===== Types & Interfaces =====
/**
 * EventData: Structure for event details
 * Props: modelValue (event data), photoPreview (image URL)
 */
import { ref } from 'vue'

interface EventData {
  eventName: string
  deceasedName: string
}

interface Props {
  modelValue: EventData
  photoPreview: string
}

// ===== Props & Emits =====
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EventData): void
  (e: 'update:photoPreview', value: string): void
}>()

// ===== Constants =====
const defaultPhoto = 'https://placehold.co/100x100/EFEFEF/333333?text=Photo'

// ===== [New Feature] START =====
// LocalStorage keys for event persistence
const EVENT_KEY = 'stratonea-funeral-event'
const PHOTO_KEY = 'stratonea-funeral-event-photo'

// Message state for user feedback
const eventMessage = ref('')
const eventMessageColor = ref('text-green-700')

// ===== Helper Functions =====

/**
 * Updates a single field in the event data and emits to parent.
 */
function updateField(field: keyof EventData, event: Event) {
  const target = event.target as HTMLInputElement
  const updatedValue = {
    ...props.modelValue,
    [field]: target.value
  }
  emit('update:modelValue', updatedValue)
}

/**
 * Handles photo upload and emits preview URL to parent.
 */
function handlePhotoUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // Validate file size (max 5MB for Ghana's bandwidth considerations)
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size should be less than 5MB for faster loading')
      return
    }
    // Create preview URL for the uploaded photo
    const photoUrl = URL.createObjectURL(file)
    emit('update:photoPreview', photoUrl)
  }
}

/**
 * Saves the current event details and photo to localStorage.
 * Shows a success message.
 */
function saveEvent() {
  try {
    localStorage.setItem(EVENT_KEY, JSON.stringify(props.modelValue))
    localStorage.setItem(PHOTO_KEY, props.photoPreview || '')
    eventMessage.value = 'Event saved. You can load it anytime.'
    eventMessageColor.value = 'text-green-700'
  } catch (e) {
    eventMessage.value = 'Could not save event. Try again.'
    eventMessageColor.value = 'text-red-600'
  }
}

/**
 * Loads saved event details and photo from localStorage.
 * Emits loaded values to parent. Shows a message.
 */
function loadEvent() {
  try {
    const savedEvent = localStorage.getItem(EVENT_KEY)
    const savedPhoto = localStorage.getItem(PHOTO_KEY)
    if (savedEvent) {
      emit('update:modelValue', JSON.parse(savedEvent))
      eventMessage.value = 'Event loaded.'
      eventMessageColor.value = 'text-green-700'
    } else {
      eventMessage.value = 'No saved event found.'
      eventMessageColor.value = 'text-yellow-600'
    }
    if (savedPhoto) {
      emit('update:photoPreview', savedPhoto)
    }
  } catch (e) {
    eventMessage.value = 'Could not load event. Try again.'
    eventMessageColor.value = 'text-red-600'
  }
}

/**
 * Clears the event form and removes saved event from localStorage.
 * Emits empty values to parent. Shows a message.
 */
function clearEvent() {
  try {
    localStorage.removeItem(EVENT_KEY)
    localStorage.removeItem(PHOTO_KEY)
    emit('update:modelValue', { eventName: '', deceasedName: '' })
    emit('update:photoPreview', '')
    eventMessage.value = 'Event cleared.'
    eventMessageColor.value = 'text-gray-600'
  } catch (e) {
    eventMessage.value = 'Could not clear event. Try again.'
    eventMessageColor.value = 'text-red-600'
  }
}
// ===== [New Feature] END =====
</script>
