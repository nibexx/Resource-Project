<template>
  <!-- Footer Component -->
  <footer class="text-center text-lg-start bg-dark text-muted fixed-bottom">
    <!-- Section: Social media -->
    <section class="d-flex justify-content-center justify-content-lg-between p-2 border-bottom">
      <!-- Left -->
      <div class="me-3 d-none d-lg-block text-light bg-dark">
        <span>Get connected with me on social networks:</span>
      </div>
      <!-- Left -->

      <!-- Right -->
      <div>
        <a href="https://www.instagram.com/vikram_4008/" class="me-2 text-reset">
          <i class="mdi mdi-instagram" style="color: white; font-weight: bold;"></i>
        </a>
        <a href="https://www.facebook.com/vikram.dhole.1" class="me-2 text-reset">
          <i class="mdi mdi-facebook" style="color: white; font-weight: bold;"></i>
        </a>
        <a href="" class="me-2 text-reset">
          <i class="mdi mdi-twitter" style="color: white; font-weight: bold;"></i>
        </a>
        <a href="mailto:vd31134@gmail.com" class="me-2 text-reset">
          <i class="mdi mdi-email-outline" style="color: white; font-weight: bold;"></i>
        </a>
        <a href="tel:+919145479297" class="me-2 text-reset">
          <i class="mdi mdi-phone" style="color: white; font-weight: bold;"></i>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->

    <!-- Copyright -->
    <div class="text-center p-2 text-light bg-dark">
      © 2023 Copyright:
      <a class="text-reset fw-bold text-light bg-dark" style="text-decoration: underline;" href="https://mdbootstrap.com/">www.naturalresources.com</a>
    </div>
    <!-- Copyright -->
  </footer>
</template>

<style>
/* Footer Styles */
footer {
  width: 100%;
  background-color: black;
  color: #ddd;
  padding: 0.5rem 0;
  position: relative;
  height: 110px; /* Reduced height */
}

footer .mdi {
  font-size: 20px; /* Adjusted icon size */
  margin-right: 8px;
}

footer a {
  color: #ddd;
  text-decoration: none;
  margin: 0 10px; /* Adjusted margin */
}

footer a:hover {
  color: #fff;
}
</style>
