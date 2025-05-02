<script>
  import { onMount } from 'svelte';

  let workouts = [];
  let isLoading = true;
  let error = null;
  
  // Function to fetch workouts from API
  async function fetchWorkouts() {
    try {
      isLoading = true;
      const response = await fetch('https://api.hevyapp.com/v1/routines?page=1&pageSize=5', {
        headers: {
          'accept': 'application/json',
          'api-key': '09dda1b4-5e8d-4f31-8dc3-8ec3e412c75f'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      workouts = data.routines || []; // Using routines as workouts in this case
    } catch (err) {
      error = err.message;
      console.error('Error fetching workouts:', err);
    } finally {
      isLoading = false;
    }
  }

  // Function to format time period
  function formatTimePeriod(startTime, endTime) {
    if (!startTime || !endTime) return 'Time not available';
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    return `${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  }
  
  // Function to format date in Europe/London timezone
  function formatEuropeanDate(dateString) {
    if (!dateString) return 'Date not available';
    
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', { 
      timeZone: 'Europe/London',
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Function to calculate time since creation in a readable format
  function getTimeSinceCreation(dateString) {
    if (!dateString) return '';
    
    const created = new Date(dateString);
    const now = new Date();
    
    const diffInMs = now - created;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 30) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  }

  // Function to format duration in a readable way
  function formatDuration(seconds) {
    if (!seconds) return 'N/A';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${remainingSeconds}s`;
    } else if (remainingSeconds === 0) {
      return `${minutes}m`;
    } else {
      return `${minutes}m ${remainingSeconds}s`;
    }
  }

  // Calculate total duration in seconds for a workout
  function calculateTotalDuration(workout) {
    if (!workout || !workout.exercises) return 0;
    
    return workout.exercises.reduce((total, exercise) => {
      if (!exercise.sets) return total;
      
      return total + exercise.sets.reduce((setTotal, set) => {
        return setTotal + (set.duration_seconds || 0);
      }, 0);
    }, 0);
  }

  // Function to get a color based on set type for visual distinction
  function getSetTypeColor(type) {
    switch (type) {
      case 'warmup':
        return 'bg-yellow-100 text-yellow-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'dropset':
        return 'bg-purple-100 text-purple-800';
      case 'failure':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  onMount(() => {
    fetchWorkouts();
  });
</script>

<section class="py-10 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-10">My Workouts</h2>
    
    {#if isLoading}
      <div class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline"> {error}</span>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each workouts as workout}
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
              <h3 class="text-xl font-semibold text-white">{workout.title}</h3>
              {#if workout.description}
                <p class="text-blue-100 text-sm mt-1">{workout.description}</p>
              {/if}
              <p class="text-blue-100 text-sm mt-2">
                {workout.start_time && workout.end_time ? 
                  formatTimePeriod(workout.start_time, workout.end_time) : 
                  formatTimePeriod(workout.created_at, workout.updated_at)}
              </p>
              
              <div class="flex flex-wrap gap-2 mt-2">
                <div class="rounded-full bg-blue-800 bg-opacity-30 px-3 py-1 text-xs text-white">
                  <span>Total Weight: {workout.exercises?.reduce((total, ex) => 
                    total + (ex.sets?.reduce((setTotal, set) => 
                      setTotal + (set.weight_kg || 0), 0) || 0), 0)}kg</span>
                </div>
                <div class="rounded-full bg-blue-800 bg-opacity-30 px-3 py-1 text-xs text-white">
                  <span>Duration: {formatDuration(calculateTotalDuration(workout))}</span>
                </div>
              </div>
              
              {#if workout.created_at}
                <div class="flex items-center gap-2 mt-3">
                  <div class="bg-blue-800 bg-opacity-30 rounded-md px-3 py-1 text-xs text-white">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Created: {formatEuropeanDate(workout.created_at)}
                    </div>
                  </div>
                  <div class="bg-blue-800 bg-opacity-30 rounded-md px-3 py-1 text-xs text-white">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {getTimeSinceCreation(workout.created_at)}
                    </div>
                  </div>
                </div>
              {/if}
            </div>
            
            <div class="px-6 py-4">
              <h4 class="text-lg font-semibold text-gray-700 mb-2">Exercises</h4>
              
              {#if workout.exercises && workout.exercises.length > 0}
                <div class="space-y-4">
                  {#each workout.exercises as exercise}
                    <div class="border border-gray-200 rounded-md p-3">
                      <h5 class="font-medium text-gray-800">{exercise.title}</h5>
                      
                      {#if exercise.sets && exercise.sets.length > 0}
                        <div class="mt-2 grid grid-cols-3 gap-2">
                          {#each exercise.sets as set}
                            <div class="rounded p-2 text-sm {getSetTypeColor(set.type)}">
                              <span class="capitalize font-medium">{set.type || 'Set'}</span>
                              <div class="flex justify-between mt-1">
                                <span>{set.weight_kg || 0}kg</span>
                                <span>×{set.reps || 0}</span>
                              </div>
                              {#if set.duration_seconds}
                                <div class="text-xs mt-1 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {formatDuration(set.duration_seconds)}
                                </div>
                              {/if}
                              {#if set.distance_meters}
                                <div class="text-xs mt-1 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  {set.distance_meters}m
                                </div>
                              {/if}
                              {#if set.rpe}
                                <div class="text-xs mt-1 flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                  RPE: {set.rpe}
                                </div>
                              {/if}
                            </div>
                          {/each}
                        </div>
                      {:else}
                        <p class="text-sm text-gray-500 mt-1">No sets defined</p>
                      {/if}
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-gray-500">No exercises in this workout</p>
              {/if}
            </div>
            
            <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition-colors duration-200">
                View Details
              </button>
            </div>
          </div>
        {/each}
      </div>
      
      {#if workouts.length === 0}
        <div class="text-center py-10">
          <p class="text-gray-600">No workouts found</p>
          <button class="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition-colors duration-200">
            Start New Workout
          </button>
        </div>
      {/if}
    {/if}
  </div>
</section>