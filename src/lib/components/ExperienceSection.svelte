<script lang="ts">                                                                                                                                                              
    import SectionWrapper from '$lib/components/SectionWrapper.svelte';                                                                                                          
    
    interface Experience {
      id: number;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
      logoUrl: string;
      linkedInUrl?: string;
    }
    
    // Sample experience data
    const experiences: Experience[] = [
      {
        id: 1,
        company: "Featured Company",
        position: "Senior Developer",
        startDate: "Jan 2022",
        endDate: "Present",
        description: "Led development of key projects and mentored junior developers. Implemented new technologies that improved performance by 40%. Collaborated with cross-functional teams to deliver high-quality solutions on time.",
        logoUrl: "https://placehold.co/100x100",
        linkedInUrl: "https://linkedin.com/in/yourprofile"
      },
      {
        id: 2,
        company: "Tech Solutions Inc.",
        position: "Full Stack Developer",
        startDate: "Mar 2020",
        endDate: "Dec 2021",
        description: "Developed and maintained web applications using modern JavaScript frameworks. Worked closely with design team to implement responsive UI components.",
        logoUrl: "https://placehold.co/100x100"
      },
      {
        id: 3,
        company: "Digital Innovations",
        position: "Frontend Developer",
        startDate: "Jun 2018",
        endDate: "Feb 2020",
        description: "Created responsive web interfaces and implemented UI/UX designs. Optimized application performance and collaborated on API integrations.",
        logoUrl: "https://placehold.co/100x100"
      },
      {
        id: 4,
        company: "Web Creators",
        position: "Junior Developer",
        startDate: "Jan 2017",
        endDate: "May 2018",
        description: "Assisted in developing web applications and websites. Learned modern development practices and contributed to team projects.",
        logoUrl: "https://placehold.co/100x100"
      },
      {
        id: 5,
        company: "StartUp Labs",
        position: "Intern",
        startDate: "May 2016",
        endDate: "Dec 2016",
        description: "Gained hands-on experience in web development. Assisted senior developers with various tasks and learned industry best practices.",
        logoUrl: "https://placehold.co/100x100"
      }
    ];
  </script>                                                                                                                                                                       
                                                                                                                                                                                  
  <SectionWrapper id="experience" title="Experience">          
    <div class="max-w-[1200px] mx-auto w-full py-2 mb-10">                                                                                                                       
      <div class="experience-container">
        <h2 class="text-2xl md:text-3xl font-semibold mb-3">Professional <span class="text-green-400">Experience</span></h2>
        <p class="text-lg md:text-xl w-full mb-6">
          My journey through the tech industry and the roles I've had along the way.
        </p>
        
        <!-- Featured Experience (Full Width) -->
        {#if experiences.length > 0}
          <div class="featured-experience">
            <div class="experience-card featured">
              <div class="card-content">
                <div class="logo-container">
                  <img src={experiences[0].logoUrl} alt="{experiences[0].company} logo" class="company-logo" />
                </div>
                <div class="details-container">
                  <div class="header-row">
                    <h3 class="company-name">{experiences[0].company}</h3>
                    <span class="date-range">{experiences[0].startDate} - {experiences[0].endDate}</span>
                  </div>
                  <p class="position">{experiences[0].position}</p>
                  <p class="description">{experiences[0].description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Grid of Experiences (2x2) -->
          {#if experiences.length > 1}
            <div class="experiences-grid">
              {#each experiences.slice(1) as experience}
                <div class="experience-card">
                  <div class="card-content">
                    <div class="logo-container">
                      <img src={experience.logoUrl} alt="{experience.company} logo" class="company-logo" />
                    </div>
                    <div class="details-container">
                      <div class="header-row">
                        <h3 class="company-name">{experience.company}</h3>
                        <span class="date-range">{experience.startDate} - {experience.endDate}</span>
                      </div>
                      <p class="position">{experience.position}</p>
                      <p class="description">{experience.description}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
          
          <!-- LinkedIn Button -->
          <div class="linkedin-button-container">
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" class="linkedin-button">
              View more on LinkedIn
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </a>
          </div>
        {/if}
      </div>
    </div>                                                                                                                                                              
  </SectionWrapper>                                                                                                                                                               
  
  <style>
    .experience-container {
      width: 100%;
    }
    
    .featured-experience {
      margin-bottom: 2rem;
    }
    
    .experiences-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
      gap: 1.5rem;
    }
    
    .experience-card {
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
    }
    
    .experience-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }
    
    .experience-card.featured {
      border-left: 4px solid #3b82f6;
    }
    
    .card-content {
      padding: 1.5rem;
      display: flex;
      gap: 1.5rem;
    }
    
    .logo-container {
      flex-shrink: 0;
    }
    
    .company-logo {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border-radius: 8px;
    }
    
    .details-container {
      flex-grow: 1;
    }
    
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .company-name {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
    
    .date-range {
      font-size: 0.9rem;
      color: #6c757d;
    }
    
    .position {
      font-size: 1.1rem;
      color: #4b5563;
      margin-bottom: 0.75rem;
      font-weight: 500;
    }
    
    .description {
      color: #555;
      line-height: 1.6;
    }
    
    /* LinkedIn Button */
    .linkedin-button-container {
      display: flex;
      justify-content: center;
      margin-top: 2.5rem;
    }
    
    .linkedin-button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background-color: #0077b5;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      transition: background-color 0.3s ease;
      text-decoration: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .linkedin-button:hover {
      background-color: #005e93;
    }
    
    .linkedin-button svg {
      margin-top: 1px;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .experiences-grid {
        grid-template-columns: 1fr;
      }
      
      .card-content {
        flex-direction: column;
        gap: 1rem;
      }
      
      .header-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }
    }
  </style>                                                                                                                                                                                
