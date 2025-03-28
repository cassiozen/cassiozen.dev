// Email protection - Prevents crawlers from scraping email
document.addEventListener("DOMContentLoaded", () => {
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
});

export {};
