<template>
  <div class="bg-white rounded-lg shadow-md">
    <div class="flex items-center gap-3 px-2 pb-2">
      <h2 class="text-lg font-semibold text-gray-800">Список городов</h2>
    </div>

    <div class="flex flex-col">
      <div v-for="city in cities" :key="city.id" class="border-b border-gray-200">
        <button
          @click="$emit('toggleCity', city.id)"
          class="w-full flex justify-between items-center px-4 py-2 text-left hover:bg-gray-50"
        >
          <div class="flex items-center gap-4">
            <span class="w-2.5 h-2.5 bg-green-700 rounded-full"></span>
            <span class="font-medium text-gray-900">{{ city.name }}</span>
          </div>
          <span class="text-gray-500 text-sm">({{ city.dealers.length }} дилеров)</span>
        </button>

        <transition name="expand">
          <div v-if="activeCityId === city.id" class="bg-white md:max-h-64 md:overflow-y-auto">
            <div
              v-for="dealer in city.dealers"
              :key="dealer.id"
              @click="$emit('selectDealer', dealer)"
              class="px-4 py-2 border-t border-gray-100 cursor-pointer hover:bg-blue-50"
              :class="{ 'bg-blue-100': selectedDealer && selectedDealer.id === dealer.id }"
            >
              <p class="font-bold text-md">{{ dealer.name }}</p>
              <p class="text-sm text-gray-600">{{ dealer.address }}</p>
              <p class="text-sm text-gray-600">{{ dealer.phone }}</p>

              <!-- Слот карты (для мобилки) -->
              <slot
                name="map"
                v-if="selectedDealer && selectedDealer.id === dealer.id"
                :dealer="dealer"
              ></slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cities: any[]
  activeCityId: number | null
  selectedDealer: any
}>()

defineEmits(['toggleCity', 'selectDealer'])
</script>
