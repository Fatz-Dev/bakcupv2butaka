<template>
  <div class="wrapper">
    <!-- loader Start -->
    <div id="loading" v-if="loading">
      <div class="loader simple-loader">
        <div class="loader-body"></div>
      </div>
    </div>
    <!-- loader END -->

    <section class="login-content">
      <div class="row m-0 align-items-center bg-white vh-100">
        <div class="col-md-6">
          <div class="row justify-content-center">
            <div class="col-md-10">
              <div class="card card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">
                <div class="card-body">
                  <router-link to="/" class="navbar-brand d-flex align-items-center mb-3">
                    <div class="logo-main">
                      <div class="logo-normal">
                        <svg class="text-primary icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
                          <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
                          <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
                          <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                    <h4 class="logo-title ms-3">BuTaKa</h4>
                  </router-link>
                  <h2 class="mb-2 text-center">Sign In</h2>
                  <p class="text-center">Login to stay connected.</p>

                  <form @submit.prevent="handleLogin">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="username" class="form-label">Username</label>
                          <input type="text" class="form-control" id="username" v-model="form.username" placeholder="admin" required>
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label for="password" class="form-label">Password</label>
                          <input type="password" class="form-control" id="password" v-model="form.password" placeholder="Enter your password" required>
                        </div>
                      </div>
                      <div class="col-lg-12 d-flex justify-content-between">
                        <div class="form-check mb-3">
                          <input type="checkbox" class="form-check-input" id="customCheck1" v-model="form.remember">
                          <label class="form-check-label" for="customCheck1">Remember Me</label>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button type="submit" class="btn btn-primary">Sign In</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="sign-bg">
            <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.05">
                <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
              </g>
            </svg>
          </div>
        </div>

        <div class="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
          <img src="/assets/images/auth/01.png" class="img-fluid gradient-main animated-scaleX" alt="images">
          <img src="/assets/images/loader.gif" alt="User-Profile" class="img-fluid avatar avatar-100 animated-scaleX avatar-rounded position-absolute top-50 start-50 translate-middle">
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);

const form = reactive({
  username: '',
  password: '',
  remember: false
});

const handleLogin = () => {
  console.log('Login:', form);
  // TODO: API call
  router.push('/dashboard');
};

// Load Hope UI Styles
const loadHopeUI = () => {
  const cssFiles = [
    { id: 'hope-ui-core', href: '/assets/css/core/libs.min.css' },
    { id: 'hope-ui-main', href: '/assets/css/hope-ui.min.css?v=2.0.0' },
    { id: 'hope-ui-custom', href: '/assets/css/custom.min.css?v=2.0.0' },
    { id: 'hope-ui-dark', href: '/assets/css/dark.min.css' },
    { id: 'hope-ui-customizer', href: '/assets/css/customizer.min.css' },
    { id: 'hope-ui-rtl', href: '/assets/css/rtl.min.css' }
  ];

  cssFiles.forEach(({ id, href }) => {
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });

  // Load JS
  const jsFiles = [
    { id: 'hope-ui-libs-js', src: '/assets/js/core/libs.min.js' },
    { id: 'hope-ui-ext-js', src: '/assets/js/core/external.min.js' },
    { id: 'hope-ui-main-js', src: '/assets/js/hope-ui.js' }
  ];

  jsFiles.forEach(({ id, src }) => {
    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      document.body.appendChild(script);
    }
  });
};

onMounted(() => {
  // Remove Tailwind if present (doesn't really work for CDN script, but we try)
  const tailwind = document.getElementById('tailwind-cdn');
  if (tailwind) tailwind.remove();

  loadHopeUI();
});
</script>
