import React from 'react'

function Loading() {
  return (
    <div class="relative  rounded-md p-4  w-full mx-auto">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div class="h-3 bg-gray-600 rounded-full"></div>
        <div class="h-3 bg-gray-600 rounded-full"></div>
        <div class="h-3 bg-gray-600 rounded-full"></div>
        <div class="h-3 bg-gray-600 rounded-full"></div>
        <div class="h-3 bg-gray-600 rounded-full"></div>
        <div class="h-3 bg-gray-600 rounded-full"></div>
        <div class="h-3 bg-gray-600 rounded-full"></div>
  
      </div>
    </div>
  </div>
  )
}

export default Loading