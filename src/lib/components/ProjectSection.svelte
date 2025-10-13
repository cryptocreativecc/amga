<script lang="ts">                                                                                                                                                              
    import { onMount } from 'svelte';                                                                                                                                             
    import SectionWrapper from '$lib/components/SectionWrapper.svelte';                                                                                                          
                                                                                                                                                                                  
    interface Repository {                                                                                                                                                        
      id: number;                                                                                                                                                                 
      name: string;                                                                                                                                                               
      description: string;                                                                                                                                                        
      language: string;                                                                                                                                                           
      updated_at: string;                                                                                                                                                         
      html_url: string;                                                                                                                                                           
      languages_url: string;                                                                                                                                                      
      languages: Record<string, number>;                                                                                                                                          
    }                                                                                                                                                                             
                                                                                                                                                                                  
    let repositories: Repository[] = [];                                                                                                                                          
    let loading = true;                                                                                                                                                           
    let error = false;                                                                                                                                                            
                                                                                                                                                                                  
    // Format date to a more readable format                                                                                                                                      
    function formatDate(dateString: string): string {                                                                                                                             
      const date = new Date(dateString);                                                                                                                                          
      return date.toLocaleDateString('en-US', {                                                                                                                                   
        year: 'numeric',                                                                                                                                                          
        month: 'short',                                                                                                                                                           
        day: 'numeric'                                                                                                                                                            
      });                                                                                                                                                                         
    }                                                                                                                                                                             
                                                                                                                                                                                  
    // Fetch repositories from GitHub API                                                                                                                                         
    async function fetchRepositories() {                                                                                                                                          
      try {                                                                                                                                                                       
        const response = await fetch('https://api.github.com/users/BWDC-dev/repos?sort=updated&per_page=6');                                                                      
                                                                                                                                                                                  
        if (!response.ok) {                                                                                                                                                       
          throw new Error('Failed to fetch repositories');                                                                                                                        
        }                                                                                                                                                                         
                                                                                                                                                                                  
        const repos = await response.json();                                                                                                                                      
                                                                                                                                                                                  
        // Fetch languages for each repository                                                                                                                                    
        const reposWithLanguages = await Promise.all(                                                                                                                             
          repos.map(async (repo: Repository) => {                                                                                                                                 
            try {                                                                                                                                                                 
              const langResponse = await fetch(repo.languages_url);                                                                                                               
              if (langResponse.ok) {                                                                                                                                              
                repo.languages = await langResponse.json();                                                                                                                       
              }                                                                                                                                                                   
            } catch (e) {                                                                                                                                                         
              console.error(`Failed to fetch languages for ${repo.name}`, e);                                                                                                     
              repo.languages = {};                                                                                                                                                
            }                                                                                                                                                                     
            return repo;                                                                                                                                                          
          })                                                                                                                                                                      
        );                                                                                                                                                                        
                                                                                                                                                                                  
        repositories = reposWithLanguages;                                                                                                                                        
      } catch (e) {                                                                                                                                                               
        console.error('Error fetching repositories:', e);                                                                                                                         
        error = true;                                                                                                                                                             
      } finally {                                                                                                                                                                 
        loading = false;                                                                                                                                                          
      }                                                                                                                                                                           
    }                                                                                                                                                                             
                                                                                                                                                                                  
    onMount(() => {                                                                                                                                                               
      fetchRepositories();                                                                                                                                                        
    });                                                                                                                                                                           
  </script>                                                                                                                                                                       
                                                                                                                                                                                  
  <SectionWrapper id="projects" title="Projects">          
    <div class="max-w-[1200px] mx-auto w-full py-2 mb-10">                                                                                                                       
    <div class="projects-container">                                                                                                                                              
      {#if loading}                                                                                                                                                               
        <div class="loading">                                                                                                                                                     
          <p>Loading projects...</p>                                                                                                                                              
        </div>                                                                                                                                                                    
      {:else if error}                                                                                                                                                            
        <div class="error">                                                                                                                                                       
          <p>Failed to load projects. Please try again later.</p>                                                                                                                 
        </div>                                                                                                                                                                    
      {:else if repositories.length === 0}                                                                                                                                        
        <div class="no-repos">                                                                                                                                                    
          <p>No repositories found.</p>                                                                                                                                           
        </div>                                                                                                                                                                    
      {:else}                    
      <h2 class="text-2xl md:text-3xl font-semibold mb-3">Current <span class="amga-purple">Projects</span></h2>
          <p class="text-lg md:text-xl w-full mb-2">
            I'm passionate about expanding my coding knowledge and constantly seeking ways to enhance my programming efficiency. Exploring new programming techniques and best practices. I'm particularly interested in AI implementation and integration, studying ways to leverage artificial intelligence to create more sophisticated and intelligent solutions. My drive to learn extends beyond just writing code – I focus on understanding system architecture, optimisation techniques, and emerging technologies to make both myself and my code more effective.
          </p>
          <div class="live-indicator">
            <div class="pulse-circle"></div>
            <span>Live from <i class="fa-brands fa-github"></i> Github</span>
          </div>                                                                                                                                                 
        <div class="projects-grid">                                                                                                                                               
          {#each repositories as repo}                                                                                                                                            
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="project-card">                                                                               
              <div class="repo-title">
                <i class="fa-brands fa-github github-icon"></i>
                <h3>{repo.name}</h3>
              </div>                                                                                                                                               
              <p class="description">{repo.description || 'No description available'}</p>                                                                                         
                                                                                                                                                                                  
              <div class="languages">                                                                                                                                             
                {#if repo.languages && Object.keys(repo.languages).length > 0}                                                                                                    
                  {#each Object.keys(repo.languages) as language}                                                                                                                 
                    <span class="language-tag">{language}</span>                                                                                                                  
                  {/each}                                                                                                                                                         
                {:else}                                                                                                                                                           
                  <span class="language-tag">{repo.language || 'Unknown'}</span>                                                                                                  
                {/if}                                                                                                                                                             
              </div>                                                                                                                                                              
                                                                                                                                                                                  
              <p class="updated">Last updated: {formatDate(repo.updated_at)}</p>                                                                                                  
            </a>                                                                                                                                                                  
          {/each}                                                                                                                                                                 
        </div>
        <div class="view-more-container">
          <a href="https://github.com/BWDC-dev" target="_blank" rel="noopener noreferrer" class="view-more-button">
            <i class="fa-brands fa-github"></i> View more projects on Github
          </a>
        </div>                                                                                                                                                                    
      {/if}                                                                                                                                                                       
    </div>          
    </div>                                                                                                                                                              
  </SectionWrapper>                                                                                                                                                               
                                                                                                                                                                                  
  <style>                                                                                                                                                                         
    .projects-container {                                                                                                                                                         
      width: 100%;                                                                                                                                                                
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .projects-grid {                                                                                                                                                              
      display: grid;                                                                                                                                                              
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));                                                                                                               
      gap: 1.5rem;                                                                                                                                                                
      margin-top: 2rem;                                                                                                                                                           
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .project-card {                                                                                                                                                               
      background-color: #f8f9fa;                                                                                                                                                  
      border-radius: 8px;                                                                                                                                                         
      padding: 1.5rem;                                                                                                                                                            
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);                                                                                                                                   
      transition: transform 0.3s ease, box-shadow 0.3s ease;                                                                                                                      
      display: flex;                                                                                                                                                              
      flex-direction: column;                                                                                                                                                     
      height: 100%;                                                                                                                                                               
      text-decoration: none;                                                                                                                                                      
      color: inherit;                                                                                                                                                             
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .project-card:hover {                                                                                                                                                         
      transform: translateY(-5px);                                                                                                                                                
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);                                                                                                                                 
    }
    
    .repo-title {
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    
    .github-icon {
      color: #000;
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
                                                                                                                                                                                  
    h3 {                                                                                                                                                                          
      margin: 0;                                                                                                                                                              
      font-size: 1.25rem;                                                                                                                                                         
      color: #333;                                                                                                                                                                
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .description {                                                                                                                                                                
      flex-grow: 1;                                                                                                                                                               
      margin-bottom: 1rem;                                                                                                                                                        
      color: #555;                                                                                                                                                                
      font-size: 0.95rem;                                                                                                                                                         
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .languages {                                                                                                                                                                  
      display: flex;                                                                                                                                                              
      flex-wrap: wrap;                                                                                                                                                            
      gap: 0.5rem;                                                                                                                                                                
      margin-bottom: 1rem;                                                                                                                                                        
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .language-tag {                                                                                                                                                               
      background-color: #e9ecef;                                                                                                                                                  
      padding: 0.25rem 0.5rem;                                                                                                                                                    
      border-radius: 4px;                                                                                                                                                         
      font-size: 0.8rem;                                                                                                                                                          
      color: #495057;                                                                                                                                                             
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .updated {                                                                                                                                                                    
      font-size: 0.8rem;                                                                                                                                                          
      color: #6c757d;                                                                                                                                                             
      margin-bottom: 0;                                                                                                                                                           
    }                                                                                                                                                                             
                                                                                                                                                                                  
    .loading, .error, .no-repos {                                                                                                                                                 
      text-align: center;                                                                                                                                                         
      padding: 2rem;                                                                                                                                                              
      color: #6c757d;                                                                                                                                                             
    }
    
    .view-more-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
    
    .view-more-button {
      display: inline-flex;
      align-items: center;
      background-color: #24292e;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      transition: background-color 0.3s ease;
      text-decoration: none;
    }
    
    .view-more-button:hover {
      background-color: #2c974b;
    }
    
    .view-more-button i {
      margin-right: 0.5rem;
      font-size: 1.25rem;
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
