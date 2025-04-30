<script lang="ts">
  import { onMount } from 'svelte';
  import SectionWrapper from '$lib/components/SectionWrapper.svelte';

  interface WorkoutStats {
    totalWorkouts: number;
    followers: number;
    following: number;
  }

  let stats: WorkoutStats = {
    totalWorkouts: 0,
    followers: 0,
    following: 1
  };

  let loading = true;
  let error = false;

  // Mock function to simulate fetching data from Hevy
  // In a real implementation, you would use their API if available
  function fetchHevyData() {
    return new Promise<WorkoutStats>((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        try {
          // This data is hardcoded based on the provided Hevy profile
          resolve({
            totalWorkouts: 0,
            followers: 0,
            following: 1
          });
        } catch (e) {
          reject(e);
        }
      }, 1000);
    });
  }

  async function loadHevyData() {
    try {
      stats = await fetchHevyData();
    } catch (e) {
      console.error('Error fetching Hevy data:', e);
      error = true;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadHevyData();
  });
</script>

<SectionWrapper id="fitness" title="Fitness">
  <div class="max-w-[1200px] mx-auto w-full py-2 mb-10">
    <div class="fitness-container">
      {#if loading}
        <div class="loading">
          <p>Loading fitness data...</p>
        </div>
      {:else if error}
        <div class="error">
          <p>Failed to load fitness data. Please try again later.</p>
        </div>
      {:else}
        <h2 class="text-2xl md:text-3xl font-semibold mb-3">Fitness <span class="text-green-500">Journey</span></h2>
        <p class="text-lg md:text-xl w-full mb-2">
          Tracking my progress and staying consistent with my workouts.
        </p>
        <div class="live-indicator">
          <div class="pulse-circle"></div>
          <span>Connected with <i class="fa-solid fa-dumbbell"></i> Hevy</span>
        </div>

        <div class="hevy-profile mb-6">
          <div class="profile-header">
            <div class="profile-image">
              <i class="fa-solid fa-dumbbell profile-icon"></i>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">bwdc</h3>
              <p class="profile-fullname">Austin McCormick</p>
              <p class="profile-bio">"Original chunky monkey."</p>
            </div>
          </div>

          <div class="stats-container">
            <div class="stat-card">
              <span class="stat-value">{stats.totalWorkouts}</span>
              <span class="stat-label">Workouts</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{stats.followers}</span>
              <span class="stat-label">Followers</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{stats.following}</span>
              <span class="stat-label">Following</span>
            </div>
          </div>

          <div class="recent-workouts">
            <h4 class="workouts-title">Recent Workouts</h4>
            <div class="no-workouts">
              <i class="fa-solid fa-calendar-xmark"></i>
              <p>No recent workouts to display</p>
            </div>
          </div>

        </div>
        
        <div class="view-more-container">
          <a href="https://hevy.com/user/bwdc" target="_blank" rel="noopener noreferrer" class="view-more-button">
            <i class="fa-solid fa-dumbbell"></i> View profile on Hevy
          </a>
        </div>
      {/if}
    </div>
  </div>
</SectionWrapper>

<style>
  .fitness-container {
    width: 100%;
  }

  .hevy-profile {
    background-color: #f8f9fa;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .profile-image {
    width: 80px;
    height: 80px;
    background-color: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
  }

  .profile-icon {
    font-size: 2.5rem;
    color: #495057;
  }

  .profile-info {
    flex: 1;
  }

  .profile-name {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  .profile-fullname {
    font-size: 1.1rem;
    color: #495057;
    margin: 0 0 0.5rem 0;
  }

  .profile-bio {
    font-size: 0.95rem;
    color: #6c757d;
    font-style: italic;
    margin: 0;
  }

  .stats-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .stat-card {
    flex: 1;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 1.25rem;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    margin: 0 0.5rem;
  }

  .stat-card:first-child {
    margin-left: 0;
  }

  .stat-card:last-child {
    margin-right: 0;
  }

  .stat-value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: #2ea44f;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #6c757d;
  }

  .recent-workouts {
    margin-bottom: 2rem;
  }

  .workouts-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }

  .no-workouts {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    color: #6c757d;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .no-workouts i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #dee2e6;
  }

  .view-more-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .view-more-button {
    display: inline-flex;
    align-items: center;
    background-color: #2ea44f;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .view-more-button:hover {
    background-color: #22863a;
  }

  .view-more-button i {
    margin-right: 0.5rem;
    font-size: 1.25rem;
  }

  .download-app {
    text-align: center;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .download-app p {
    margin-bottom: 1rem;
    font-weight: 600;
    color: #495057;
  }

  .app-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .app-button {
    display: inline-flex;
    align-items: center;
    background-color: #24292e;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
    text-decoration: none;
  }

  .app-button:hover {
    background-color: #333;
  }

  .app-button i {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }

  .loading, .error {
    text-align: center;
    padding: 2rem;
    color: #6c757d;
  }

  .live-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: #6c757d;
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

  @media (max-width: 768px) {
    .stats-container {
      flex-direction: column;
      gap: 1rem;
    }

    .stat-card {
      margin: 0;
    }

    .app-buttons {
      flex-direction: column;
    }
  }
</style>
