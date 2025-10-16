<script>
  import { onMount } from 'svelte';
  import SectionWrapper from '$lib/components/SectionWrapper.svelte';
  import HevyIcon from '$lib/icons/heavy-icon.svelte';
  import WeightTrainingIcon from '$lib/icons/fitness/weight-training-icon.svelte';

  let workouts = [];
  let isLoading = true;
  let error = null;
  let showExercises = false; // State to control dropdown visibility
  
  // Function to fetch workouts from API via server endpoint
  async function fetchWorkouts() {
    try {
      isLoading = true;
      // Use a server endpoint instead of directly exposing API key in client code
      const response = await fetch('/api/workouts');
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      const allWorkouts = data.workouts || []; // Using workouts from the API
      
      // Sort workouts by created_at date (most recent first) and take only the first one
      workouts = allWorkouts
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 1); // Only keep the most recent workout
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
        return 'bg-green-100 text-green-800';
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

<SectionWrapper id="fitness" title="Fitness">
  <div class="max-w-[1200px] mx-auto w-full py-2 mb-10">
    <div class="text-center">
      <h2 class="text-2xl md:text-3xl font-semibold mb-3">Activity <span class="amga-purple">Logs</span></h2>
      <div class="max-w-[20%] h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-2 mb-4 mx-auto"></div>
      <p class="text-lg md:text-lg w-full mb-8">
        I enjoy staying active to boost my mental health through various outdoor activities and exercise. Whether I'm swimming laps at the pool, lifting weights at the gym, hiking scenic trails, or cycling through different routes, keeping my body moving helps maintain my mental wellbeing. 
      </p>
      <div class="live-indicator">
        <div class="pulse-circle"></div>
        <span>Live from <HevyIcon class="hevy-icon" /> Hevy</span>
      </div>
      
      {#if isLoading}
        <div class="flex justify-center items-center h-40">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      {:else if error}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> {error}</span>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {#each workouts as workout}
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h3 class="text-xl font-semibold text-white">{workout.title}</h3>
                {#if workout.description}
                  <p class="text-green-100 text-sm mt-1">{workout.description}</p>
                {/if}
                <div class="flex flex-wrap gap-2 mt-2">
                  <!-- Duration removed as requested -->
                </div>
                {#if workout.created_at}
                  <div class="grid grid-cols-1 md:flex md:flex-wrap gap-2 mt-3">
                    <div class="bg-green-800 bg-opacity-30 rounded-md px-4 py-2 text-sm text-white w-full md:w-auto">
                      <div class="flex items-center justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Workout: {formatEuropeanDate(workout.created_at)}
                      </div>
                    </div>
                    <div class="bg-green-800 bg-opacity-30 rounded-md px-4 py-2 text-sm text-white w-full md:w-auto">
                      <div class="flex items-center justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {getTimeSinceCreation(workout.created_at)}
                      </div>
                    </div>
                    <div class="bg-green-800 bg-opacity-30 rounded-md px-4 py-2 text-sm text-white w-full md:w-auto">
                      <div class="flex items-center justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                        Total Weight: {workout.exercises?.reduce((total, ex) => 
                          total + (ex.sets?.reduce((setTotal, set) => 
                            setTotal + (set.weight_kg || 0), 0) || 0), 0)}kg
                      </div>
                    </div>
                    <div class="bg-green-800 bg-opacity-30 rounded-md px-4 py-2 text-sm text-white w-full md:w-auto">
                      <div class="flex items-center justify-center md:justify-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Total Sets: {workout.exercises?.reduce((total, ex) => 
                          total + (ex.sets?.length || 0), 0)}
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
              
              <div class="px-6 py-4">
                <!-- Exercises Dropdown Header -->
                <div 
                  class="flex items-center justify-between mb-4 cursor-pointer" 
                  role="button"
                  tabindex="0"
                  on:click={() => showExercises = !showExercises}
                  on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      showExercises = !showExercises;
                    }
                  }}
                >
                  <h4 class="text-lg font-semibold text-gray-700">Exercises ({workout.exercises?.length || 0})</h4>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">{showExercises ? 'Hide' : 'Show'} exercises</span>
                    <svg 
                      class={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showExercises ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <!-- Exercises Dropdown Content -->
                {#if showExercises && workout.exercises && workout.exercises.length > 0}
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {#each workout.exercises as exercise}
                      <div class="border border-gray-200 rounded-md p-3 bg-gray-50">
                        <div class="flex items-center gap-2 mb-2">
                          <WeightTrainingIcon />
                          <h5 class="font-bold text-gray-800">{exercise.title}</h5>
                        </div>
                        {#if exercise.sets && exercise.sets.length > 0}
                          <div class="mt-2 grid grid-cols-1 gap-2">
                            {#each exercise.sets as set}
                              <div class="rounded p-2 text-sm {getSetTypeColor(set.type)} flex justify-between items-center">
                                <span class="capitalize font-medium">{set.type || 'Set'}</span>
                                
                                {#if exercise.title.toLowerCase().includes('walking')}
                                  <!-- For walking exercises, only show time -->
                                  {#if set.duration_seconds}
                                    <div class="text-xs flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {formatDuration(set.duration_seconds)}
                                    </div>
                                  {/if}
                                {:else}
                                  <!-- For non-walking exercises, show all metrics -->
                                  <div class="flex items-center gap-2 ml-auto">
                                    <span class="font-semibold">{set.weight_kg || 0}kg × {set.reps || 0}</span>
                                    {#if set.duration_seconds}
                                      <span class="text-xs flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatDuration(set.duration_seconds)}
                                      </span>
                                    {/if}
                                  </div>
                                {/if}
                                <div class="flex items-center gap-2">
                                  {#if set.distance_meters}
                                    <span class="text-xs flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                      </svg>
                                      {set.distance_meters}m
                                    </span>
                                  {/if}
                                  {#if set.rpe}
                                    <span class="text-xs flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                      </svg>
                                      RPE: {set.rpe}
                                    </span>
                                  {/if}
                                </div>
                              </div>
                            {/each}
                          </div>
                        {:else}
                          <p class="text-sm text-gray-500 mt-1">No sets defined</p>
                        {/if}
                      </div>
                    {/each}
                  </div>
                {:else if showExercises}
                  <p class="text-gray-500 text-center py-4">No exercises in this workout</p>
                {/if}
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
        
        <!-- View More Workouts Button -->
        {#if workouts.length > 0}
          <div class="view-more-button-container">
            <a href="https://hevyapp.com/user/yourprofile" target="_blank" rel="noopener noreferrer" class="view-more-button">
              View more workouts on Hevy
              <HevyIcon class="hevy-icon" />
            </a>
          </div>
        {/if}
      {/if}

      <!-- Currently Reading Section -->
      <div class="mt-16">
        <h2 class="text-2xl md:text-3xl font-semibold mb-3">Currently <span class="amga-purple">Reading</span></h2>
        <div class="max-w-[20%] h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-2 mb-4 mx-auto"></div>
        <p class="text-lg md:text-lg w-full mb-8">
          I love to read novels, non-fiction and comics and graphic novels. Reading helps me explore different perspectives, learn new things, and escape into captivating stories. Whether it's diving into complex fiction, learning from insightful non-fiction, or enjoying the visual storytelling of comics and graphic novels, I always have something interesting on my reading list.
        </p>
        
        <!-- Book/Comic Covers Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <!-- Cover 1 - The Gulag Archipelago -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <img 
                src="/the-gulag-archipelago.png" 
                alt="The Gulag Archipelago" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 text-center">
              <h3 class="font-semibold text-gray-800">The Gulag Archipelago</h3>
              <p class="text-sm text-gray-600 mt-1">Aleksandr Solzhenitsyn</p>
            </div>
          </div>
          
          <!-- Cover 2 - The Strange Case of Dr Jekyll and Mr Hyde -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <img 
                src="/the-strange-case-of-dr-jekyll-and-mr-hyde.png" 
                alt="The Strange Case of Dr Jekyll and Mr Hyde" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 text-center">
              <h3 class="font-semibold text-gray-800">Dr Jekyll and Mr Hyde</h3>
              <p class="text-sm text-gray-600 mt-1">Robert Louis Stevenson</p>
            </div>
          </div>
          
          <!-- Cover 3 - Batman: Dark Patterns -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="aspect-[3/4] bg-gray-100 flex items-center justify-center">
              <img 
                src="/batman-dark-patterns.png" 
                alt="Batman: Dark Patterns" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-4 text-center">
              <h3 class="font-semibold text-gray-800">Batman: Dark Patterns</h3>
              <p class="text-sm text-gray-600 mt-1">Graphic Novel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</SectionWrapper>

<style>
  .fitness-container {
    width: 100%;
  }
  
  .view-more-button-container {
    display: flex;
    width: fit-content;
    justify-content: center;
    margin: 2.5rem auto;
    padding: 2px;
    border-radius: 8px;
    background: linear-gradient(to right, transparent, #b687f2);
  }
  
  .view-more-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #24292e;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }
  
  .view-more-button:hover {
    background-color: #b687f2;
    color: #191923;
  }
  
  .view-more-button svg {
    margin-top: 1px;
  }
  
  .live-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #fff;
  }
  
  .pulse-circle {
    width: 10px;
    height: 10px;
    background-color: #2ea44f;
    border-radius: 50%;
    margin-right: 0.5rem;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(46, 164, 79, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(46, 164, 79, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(46, 164, 79, 0);
    }
  }
</style>
