<template>
    <!-- App Switcher with modern design -->
    <div class="relative mt-8 mb-4">
        <!-- Gradient background with subtle animation -->
        <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-95 
                    transform transition-transform hover:scale-[1.02] duration-500 rounded-lg shadow-lg">
        </div>

        <!-- Content Container -->
        <div class="relative px-6 py-8 sm:px-8">
            <div class="max-w-2xl mx-auto text-center space-y-6">
                <!-- Main Message -->
                <div class="space-y-2">
                    <h2 class="text-xl sm:text-2xl font-bold text-white">
                        Need to create an {{ alternateLabel }} tracker instead?
                    </h2>
                    <p class="text-primary-100 text-sm sm:text-base">
                        Switch to our {{ alternateLabel.toLowerCase() }} tracker for your business needs
                    </p>
                </div>

                <!-- Action Button with modern styling -->
                <div class="flex justify-center">
                    <a :href="alternateLink" class="group relative inline-flex items-center justify-center gap-2 px-6 py-3 
                               bg-white text-primary-700 font-medium rounded-full shadow-sm 
                               hover:bg-primary-50 transform transition-all duration-200 
                               hover:scale-[1.02] hover:shadow-md active:scale-[0.98]">
                        <!-- Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>

                        <!-- Button Text -->
                        <span>Switch to {{ alternateLabel }} App</span>
                    </a>
                </div>

                <!-- Optional: Add subtle pattern overlay for depth -->
                <div class="absolute inset-0 bg-pattern opacity-5 rounded-lg pointer-events-none"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { computed } from 'vue'

// ===== Props =====
const props = defineProps<{
    type: 'income' | 'expense'
}>()

// ===== Computed Properties =====
const alternateLabel = computed(() =>
    props.type === 'income' ? 'Expense' : 'Income'
)

// Update these with your live Vercel URLs
const invoiceUrl = 'https://invoice.teklumen.com'
const receiptUrl = 'https://receipt.teklumen.com'

const alternateLink = computed(() =>
    props.type === 'income' ? receiptUrl : invoiceUrl
)
</script>

<style scoped>
/* Subtle background pattern */
.bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
}

/* Smooth transitions */
.transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

/* Touch-friendly mobile optimizations */
@media (max-width: 640px) {
    a {
        min-height: 48px;
        /* Mobile touch target */
        width: 100%;
        /* Full width on mobile */
        max-width: 280px;
        /* Limit maximum width */
    }
}
</style>