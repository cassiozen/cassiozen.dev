document.addEventListener("DOMContentLoaded", () => {
  // Email protection - Prevents crawlers from scraping email
  const emailLink = document.getElementById("email-link");

  if (emailLink) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();

      // Assemble email parts to prevent scraping
      const username = "cassiozen";
      const domain = "gmail";
      const tld = "com";

      // Create the full email address on click
      window.location.href = `mailto:${username}@${domain}.${tld}`;
    });
  }

  // Add a subtle movement to the card based on mouse position
  const card = document.querySelector('.card') as HTMLElement;

  if (card) {
    // Add transition property for smooth movement
    card.style.transition = 'transform 0.2s ease-out';

    // Get the center of the viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const viewportCenterX = viewportWidth / 2;
    const viewportCenterY = viewportHeight / 2;

    // Listen for mouse movement anywhere on the document
    document.addEventListener('mousemove', (e: MouseEvent) => {
      // Calculate distance from center of viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate the percentage of mouse position within the viewport (-1 to 1)
      const xPercent = (mouseX - viewportCenterX) / (viewportWidth / 2);
      const yPercent = (mouseY - viewportCenterY) / (viewportHeight / 2);
      
      // Apply a subtle rotation/movement (multiplier controls intensity)
      const multiplier = 0.8; // Even more subtle for full-screen tracking
      const rotateX = yPercent * multiplier;
      const rotateY = -xPercent * multiplier;
      
      // Apply transform with a transition for smoothness
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Adjust shadow based on movement for added depth
      const shadowX = xPercent * 8;
      const shadowY = yPercent * 8;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(0, 0, 0, 0.15)`;
    });
    
    // Handle window resize to update viewport center
    window.addEventListener('resize', () => {
      // Update viewport dimensions
      const newViewportWidth = window.innerWidth;
      const newViewportHeight = window.innerHeight;
      
      // Update center coordinates
      const newViewportCenterX = newViewportWidth / 2;
      const newViewportCenterY = newViewportHeight / 2;
    });
  }
});

export {};
