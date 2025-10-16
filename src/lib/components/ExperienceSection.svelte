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

    interface Project {
      id: number;
      title: string;
      description: string;
      tags: string[];
      projectUrl: string;
    }
    
    // Sample experience data
    const experiences: Experience[] = [
      {
        id: 1,
        company: "Edge Hill University",
        position: "Senior Web Designer",
        startDate: "Jan 2023",
        endDate: "Present",
        description: "lead on the design of the University’s web presence to ensure an excellent online visual identity for the University and enhance usability and accessibility.",
        logoUrl: "/edge_hill_university_logo.jpeg",
        linkedInUrl: "https://linkedin.com/in/mccormick-austin"
      },
      {
        id: 2,
        company: "C21 Creative Ltd",
        position: "Senior Designer/Developer",
        startDate: "Jun 2022",
        endDate: "Jan 2023",
        description: "Design and developement on new and current client websites, I also got to use my animation skills on promotional videos for clients utilising my skills with Adobe Cloud.",
        logoUrl: "/c21_creative_communications_ltd_logo.jpeg"
      },
      {
        id: 3,
        company: "Richard Barder & Company",
        position: "Web Developer / Graphic Designer",
        startDate: "Jan 2022",
        endDate: "Jun 2022",
        description: "Created responsive web interfaces and implemented UI/UX designs. Created print and digital material to help promote the clients companies and services.",
        logoUrl: "/richard_barber__company_logo.jpeg"
      },
      {
        id: 4,
        company: "The Advocate Group",
        position: "Senior Digital Designer",
        startDate: "Jan 2017",
        endDate: "May 2018",
        description: "Assisted in developing multiple company websites and rebranding. helped to manage a small team, developer, designer and copywriter.",
        logoUrl: "/the_advocate_group_search_selection_logo.jpeg"
      },
      {
        id: 5,
        company: "Studio Retail Ltd",
        position: "Senior Graphic Designer",
        startDate: "Sep 2016",
        endDate: "May 2021",
        description: "Working on print material, catalogues and flyers, working closely with the web team to make sure both web and print matched graphically.",
        logoUrl: "/studio_retail_limited_logo.jpeg"
      }
    ];

    // Web Projects data
    const webProjects: Project[] = [
      {
        id: 1,
        title: "Edge Hill University Website",
        description: "A fully responsive educational website with accessibility being one of the main focuses.",
        tags: ["React", "Node.js", "WordPress"],
        projectUrl: "https://www.edgehill.ac.uk/"
      },
      {
        id: 2,
        title: "Oswald Road Website",
        description: "A fully responsive website created for a school needing advanced functionality.",
        tags: ["Javascript", "PHP", "WordPress"],
        projectUrl: "https://www.oswaldroad.co.uk"
      },
      {
        id: 3,
        title: "NWEH Website",
        description: "A fully responsive website created for a clinical trial company.",
        tags: ["Javascript", "PHP", "WordPress"],
        projectUrl: "https://www.nweh.co.uk"
      },
      {
        id: 4,
        title: "Dock 5 Website",
        description: "A fully responsive website to showcase sleek & statement apartments in Manchester.",
        tags: ["Javascript", "PHP", "WordPress"],
        projectUrl: "https://dock5.co.uk"
      },
      {
        id: 5,
        title: "NHS Pulmonary Website",
        description: "A fully responsive website created for the NHS to raise awareness of pulmonary rehabilitation.",
        tags: ["Javascript", "PHP", "WordPress"],
        projectUrl: "https://www.pulmonaryrehabgm.co.uk"
      },
      {
        id: 6,
        title: "LifeSaver Website",
        description: "A fully responsive website created to promote water purifiers that are proven to remove 99.99% of bacteria, cysts, and viruses.",
        tags: ["Javascript", "PHP", "WordPress"],
        projectUrl: "https://iconlifesaver.com"
      }
    ];
  </script>
                                                                                                                                                                                  
  <SectionWrapper id="experience" title="Experience">          
    <div class="max-w-[1200px] mx-auto w-full py-2 mb-10">                                                                                                                       
      <div class="text-center">
        <h2 class="text-2xl md:text-3xl font-semibold mb-3">Professional <span class="amga-purple">Experience</span></h2>
        <div class="max-w-[28%] h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-2 mb-4 mx-auto"></div>
        <p class="text-lg md:text-lg w-full mb-6">
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
                  <h4 class="position text-left">{experiences[0].position}</h4>
                  <p class="description text-left">{experiences[0].description}</p>
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
                      <h4 class="position text-left">{experience.position}</h4>
                      <p class="description text-left">{experience.description}</p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
          
          <!-- LinkedIn Button -->
          <div class="linkedin-button-container">
            <a href="https://linkedin.com/in/mccormick-austin" target="_blank" rel="noopener noreferrer" class="linkedin-button">
              View more on LinkedIn
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </a>
          </div>
        {/if}

        <!-- Web Projects Section -->
        <div class="mt-16">
          <h2 class="text-2xl md:text-3xl font-semibold mb-3">Web <span class="amga-purple">Projects</span></h2>
          <div class="max-w-[28%] h-[2px] w-full bg-gradient-to-r from-transparent to-[#b687f2] mt-2 mb-4 mx-auto"></div>
          <p class="text-lg md:text-lg w-full mb-6">
            A showcase of responsive websites I've designed and developed for various clients.
          </p>
          
          {#if webProjects.length > 0}
            <div class="projects-grid">
              {#each webProjects as project}
                <div class="project-card">
                  <div class="project-content">
                    <h3 class="project-title">{project.title}</h3>
                    <p class="project-description">{project.description}</p>
                    
                    <div class="project-tags">
                      {#each project.tags as tag}
                        <span class="project-tag">{tag}</span>
                      {/each}
                    </div>
                    
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" class="project-button">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>                                                                                                                                                              
  </SectionWrapper>
  
  <style>
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
      border-left: 4px solid #b687f2;
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
      width: fit-content;
      justify-content: center;
      margin: 2.5rem auto;
      padding: 2px;
      border-radius: 8px;
      background: linear-gradient(to right, transparent, #b687f2);
    }
    
    .linkedin-button {
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
    
    .linkedin-button:hover {
      background-color: #b687f2;
      color: #191923;
    }
    
    .linkedin-button svg {
      margin-top: 1px;
    }
    
    /* Web Projects Styles */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    
    .project-card {
      background-color: #f8f9fa;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      overflow: hidden;
      border-left: 4px solid #b687f2;
    }
    
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    .project-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
    }
    
    .project-description {
      color: #555;
      line-height: 1.6;
      margin-bottom: 1rem;
      flex-grow: 1;
    }
    
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .project-tag {
      background-color: #e9ecef;
      color: #495057;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .project-button {
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
      width: fit-content;
    }
    
    .project-button:hover {
      background-color: #b687f2;
      color: #191923;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .experiences-grid {
        grid-template-columns: 1fr;
      }
      
      .projects-grid {
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
