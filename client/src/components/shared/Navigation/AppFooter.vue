<template>
  <footer
    class="flex flex-col bg-opacity-50 bg-primary dark:bg-dark-primary items-center text-center text-surface lg:text-left"
  >
    <div class="container p-6">
      <div class="grid place-items-center lg:grid-cols-3">
        <div class="mb-6">
          <h5 class="mb-2.5 font-bold uppercase">Sapientia</h5>
          <p>
            In 2024, time is everything. <br />
            Get all of your information, from trusted sources, all in one place.
          </p>
        </div>

        <div class="mb-6">
          <h5 class="footer-button mb-2.5 font-bold uppercase">Get around</h5>

        <ul class="mb-0 list-none text-accent dark:text-dark-accent">
          <router-link to="login" class="hover:underline">
            <li>Log in</li>
          </router-link>
          <router-link to="/" class="hover:underline">
            <li>Home</li>
          </router-link>
          <router-link to="for-you" class="hover:underline">
            <li>FYP</li>
          </router-link>
          <router-link to="subscription" class="hover:underline">
            <li>Subscription</li>
          </router-link>
          <router-link to="articles">
          Articles
          </router-link>
        </ul>
      </div>

        <div class="mb-6">
          <h5 class="mb-2.5 font-bold uppercase">Security</h5>

          <ul class="mb-0 list-none text-accent dark:text-dark-accent">
            <router-link to="privacy-policy" class="hover:underline">
              <li>Privacy Policy</li>
            </router-link>
            <router-link to="terms-of-service" class="hover:underline">
              <li>Terms of Service</li>
            </router-link>
            <router-link to="gdpr" class="hover:underline">
              <li>GDPR</li>
            </router-link>
            <router-link to="cookie-policy" class="hover:underline">
              <li>Cookies</li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="w-full p-4 border-t-2 border-secondary dark:border-dark-secondary border-dashed text-center"
    >
      © 2024 Copyright:
      <a href="https://github.com/b4rdh4k/News-Aggregation-Platform">Bardha & Zani </a>
    </div>
  </footer>
</template>
