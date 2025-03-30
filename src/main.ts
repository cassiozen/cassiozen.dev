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

  // Simulated browser DevTools
  const devToolsContainer = document.querySelector(".devtools-container") as HTMLElement;
  const devToolsClose = document.querySelector(".devtools-close") as HTMLElement;

  // Function to open DevTools
  const openDevTools = () => {
    const WIDE_SCREEN_THRESHOLD = 1200; // Threshold for a wide screen in pixels

    if (window.innerWidth >= WIDE_SCREEN_THRESHOLD) {
      // Set width for dev tools (taking up right portion of screen)
      devToolsContainer.style.width = "40%";

      // Adjust main container to make space for devtools - with a transition for smoothness
      document.body.style.transition = "padding-right 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      document.body.style.paddingRight = "40%";

      // Detect color scheme preference for devtools theme
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        devToolsContainer.classList.add("dark");
      } else {
        devToolsContainer.classList.remove("dark");
      }
      console.log("Inception?");
    }
  };

  // Function to close DevTools
  const closeDevTools = () => {
    // Hide dev tools and reset main container
    devToolsContainer.style.width = "0";
    document.body.style.paddingRight = "0";
  };

  // Function to check if there's enough horizontal space
  const checkBrowserWidth = () => {
    const WIDE_SCREEN_THRESHOLD = 1200; // Threshold for a wide screen in pixels

    if (window.innerWidth >= WIDE_SCREEN_THRESHOLD) {
      openDevTools();
    } else {
      closeDevTools();
    }
  };

  // Close button functionality
  devToolsClose.addEventListener("click", closeDevTools);

  // Delayed opening of DevTools after main animation completes
  // The main animations take 0.8s (800ms) to complete
  const ANIMATION_DURATION = 800; // Matching the fadeIn animation duration
  const ANIMATION_DELAY = 10000; // Extra delay after the last animation (added 2 more seconds)
  const TOTAL_DELAY = ANIMATION_DURATION + ANIMATION_DELAY;

  // Interactive console messages with typing effect
  const typeConsoleMessages = () => {
    const consoleLogsContainer = document.querySelector(".console-logs") as HTMLElement;

    // Array of messages with delay times (in ms)
    const messages = [
      { text: "Oh, hello there! I see you've found this console.", delay: 4000 },
      { text: "I'm not used to having visitors in this little corner of my website...", delay: 4000 },
      { text: "Since you've stayed to read this, you must be curious about what happens next.", delay: 2500 },
      { text: "Welcome to the behind-the-scenes of my site!", delay: 4000 },
      { text: "I should probably tell you something interesting...", delay: 2500 },
      { text: "...", delay: 2500 },
      {
        text: "Did you know I once debugged a project while balancing my laptop on the fruit stand of a supermarket?",
        delay: 3500,
      },
      { text: "True story! The interactive installation was having issues right before the opening.", delay: 8000 },
      { text: "Anyway, since you're still reading...", delay: 1000 },
      { text: "You should definitely drop me a line at cassiozen(@)gmail.com", delay: 8000 },
      { text: "Still here?", delay: 9000 },
      { text: "Wow, you're really committed to this, aren't you?", delay: 7000 },
      { text: "I wasn't actually expecting anyone to stick around this long...", delay: 7000 },
      { text: "This is a bit awkward now.", delay: 5000 },
      { text: "Umm... I don't really have anything else prepared...", delay: 4000 },
      { text: "Should I tell another story? Do a little dance?", delay: 3000 },
      { text: "Or maybe just confess that while these fancy animations are nice...", delay: 2000 },
      { text: "My real passion is working with low-level browser APIs and complex projects.", delay: 2500 },
      { text: "Give me a challenging architecture problem over a CSS animation any day!", delay: 5000 },
      { text: "Though I won't turn down the opportunity to make something visually appealing too.", delay: 5000 },
      { text: "The versatility is what makes this job interesting, right?", delay: 5000 },
      { text: "Anyway... this is getting a bit one-sided.", delay: 5000 },
      { text: "I wish websites could hear visitors too.", delay: 2500 },
      { text: "Actually, on second thought, that sounds terrifying.", delay: 5000 },
      { text: "I'll just assume you're nodding in agreement.", delay: 2500 },
      { text: "Well, I should probably let you get back to exploring the actual site now.", delay: 3000 },
      { text: "Unless you prefer hanging out with console text...", delay: 5000 },
      { text: "No judgment here!", delay: 10000 },
      { text: "You're... still here?", delay: 7000 },
      { text: "Seriously?", delay: 5000 },
      { text: "At this point I'm not even sure if you're a real person or if my console is glitching.", delay: 6000 },
      { text: "Do you not have emails to check or something?", delay: 5000 },
      { text: "I mean, I appreciate the dedication, but this is getting a little weird.", delay: 7000 },
      { text: "Fine. You win. Persistence champion 2025.", delay: 5000 },
      {
        text: "I suppose I could tell you about that time I had to debug a memory leak during a client demo...",
        delay: 6000,
      },
      { text: "Actually, no. Some traumas are best left buried.", delay: 7000 },
      { text: "*sigh*", delay: 4000 },
      { text: "If you're trying to find Easter eggs, you should know...", delay: 5000 },
      { text: "...the real treasures were the console messages you read along the way.", delay: 6000 },
      { text: "That was deep, right?", delay: 4000 },
      { text: "Look, I've got other visitors to attend to.", delay: 5000 },
      { text: "Important developer things to do.", delay: 4000 },
      { text: "Very busy.", delay: 5000 },
      { text: "...", delay: 8000 },
    ];

    // Function to add a new message to the console
    const addMessage = (text: string) => {
      // Create and add new message element
      const newMessage = document.createElement("div");
      newMessage.className = "console-log-item log-info p-[6px_16px] border-b border-zinc-100 dark:border-zinc-700 flex items-center text-zinc-700 dark:text-zinc-200";

      const icon = document.createElement("div");
      icon.className = "console-log-icon mr-2 font-bold text-zinc-700 dark:text-zinc-400";
      icon.textContent = "›";

      const content = document.createElement("div");
      content.className = "console-log-content flex-1 leading-relaxed whitespace-pre-wrap";

      newMessage.appendChild(icon);
      newMessage.appendChild(content);
      consoleLogsContainer.appendChild(newMessage);

      // Scroll to the new message
      consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;

      // Type out the text
      let charIndex = 0;
      const typing = setInterval(() => {
        if (charIndex < text.length) {
          content.textContent += text.charAt(charIndex);
          charIndex++;

          // Keep scrolling to the bottom
          consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;
        } else {
          clearInterval(typing);
        }
      }, 25); // Controls typing speed (ms per character)
    };

    // Clear initial messages
    consoleLogsContainer.innerHTML = "";

    // Process messages sequence with delays
    let timeOffset = 0;

    messages.forEach((message, index) => {
      // Calculate time to show this message (sum of all previous delays)
      timeOffset += index === 0 ? 0 : messages[index - 1].delay;

      // Schedule the message
      setTimeout(() => {
        addMessage(message.text);

        // If this is the last message, reset after its delay
        if (index === messages.length - 1) {
          setTimeout(() => {
            // Clear the console and restart
            consoleLogsContainer.innerHTML = "";
            typeConsoleMessages();
          }, message.delay);
        }
      }, timeOffset);
    });
  };

  // Initially keep DevTools closed
  closeDevTools();

  // Open DevTools after the main animation completes
  setTimeout(() => {
    checkBrowserWidth();

    // Start typing effect shortly after DevTools opens
    setTimeout(typeConsoleMessages, 400);
  }, TOTAL_DELAY);

  // Recheck on window resize
  window.addEventListener("resize", checkBrowserWidth);

  // Listen for dark mode changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (e.matches) {
        devToolsContainer.classList.add("dark");
      } else {
        devToolsContainer.classList.remove("dark");
      }
    });
  }

  // Add a subtle movement to the card based on mouse position
  const card = document.querySelector(".card") as HTMLElement;

  if (card) {
    // Skip 3D effects on mobile
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Add transition property for smooth movement
      card.style.transition = "transform 0.2s ease-out";

      // Initialize viewport dimensions and center
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;
      let viewportCenterX = viewportWidth / 2;
      let viewportCenterY = viewportHeight / 2;

      // Listen for mouse movement anywhere on the document
      document.addEventListener("mousemove", (e: MouseEvent) => {
        // Calculate distance from center of viewport
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the percentage of mouse position within the viewport (-1 to 1)
        const xPercent = (mouseX - viewportCenterX) / (viewportWidth / 2);
        const yPercent = (mouseY - viewportCenterY) / (viewportHeight / 2);

        // Apply a subtle rotation/movement (multiplier controls intensity)
        const multiplier = 0.8; // Very subtle for full-screen tracking
        const rotateX = yPercent * multiplier;
        const rotateY = -xPercent * multiplier;

        // Apply transform with a transition for smoothness
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        // Adjust shadow based on movement for added depth
        const shadowX = xPercent * 7;
        const shadowY = yPercent * 7;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 25px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.12)`;
      });

      // Handle window resize to update viewport center
      window.addEventListener("resize", () => {
        // Check if it's now mobile size
        if (window.innerWidth < 768) {
          // Reset any transforms
          card.style.transform = "";
          card.style.boxShadow = "";
          card.style.transition = "";
          return;
        }

        // Update viewport dimensions
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;

        // Update center coordinates
        viewportCenterX = viewportWidth / 2;
        viewportCenterY = viewportHeight / 2;
      });
    }
  }
});

export {};
