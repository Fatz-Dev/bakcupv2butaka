<template>
  <div :class="{ 'sidebar-mini': sidebarCollapsed }">
    <!-- loader Start -->
    <!-- <div id="loading" v-if="loading">
      <div class="loader simple-loader">
        <div class="loader-body"></div>
      </div>
    </div> -->
    <!-- loader END -->

    <!-- Sidebar -->
    <aside class="sidebar sidebar-default sidebar-white sidebar-base navs-rounded-all" :class="{ 'sidebar-mini': sidebarCollapsed }">
      <div class="sidebar-header d-flex align-items-center justify-content-start">
        <router-link to="/dashboard" class="navbar-brand">
          <div class="logo-main">
            <div class="logo-normal">
              <svg class="icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
              </svg>
            </div>
            <div class="logo-mini">
              <svg class="icon-30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor"/>
                <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor"/>
                <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor"/>
                <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <h4 class="logo-title">BuTaKa</h4>
        </router-link>
        <div class="sidebar-toggle" @click="toggleSidebar" style="cursor: pointer;">
          <i class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </i>
        </div>
      </div>
      <div class="sidebar-body pt-0 data-scrollbar">
        <div class="sidebar-list">
          <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
            <li class="nav-item static-item">
              <a class="nav-link static-item disabled" href="#" tabindex="-1">
                <span class="default-icon">Dashboard</span>
                <span class="mini-icon"></span>
              </a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :class="{ 'active': $route.path === '/dashboard' }" to="/dashboard">
                <i class="fa-solid fa-gauge"></i>
                <span class="item-name">Dashboard</span>
              </router-link>
            </li>

            <!-- Resepsionis Menu -->
            <li class="nav-item">
              <a class="nav-link" :class="{ 'collapsed': !isResepsionisOpen }" data-bs-toggle="collapse" href="#resepsionis-menu" role="button" :aria-expanded="isResepsionisOpen" aria-controls="resepsionis-menu">
                <i class="fa-solid fa-user-tie icon"></i>
                <span class="item-name">Resepsionis</span>
                <i class="right-icon">
                  <svg class="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </i>
              </a>
              <ul class="sub-nav collapse" :class="{ 'show': isResepsionisOpen }" id="resepsionis-menu" data-bs-parent="#sidebar-menu">
                <li class="nav-item">
                  <router-link class="nav-link" :class="{ 'active': $route.path === '/dashboard/resepsionis' }" to="/dashboard/resepsionis">
                    <i class="icon"><svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor"><g><circle cx="12" cy="12" r="8" fill="currentColor"></circle></g></svg></i>
                    <span class="item-name">Daftar Resepsionis</span>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Feedback Menu -->
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/dashboard/feedback">
                <i class="fa-solid fa-comments icon"></i>
                <span class="item-name">Daftar Feedback</span>
              </router-link>
            </li>

            <!-- Tamu Menu -->
            <li class="nav-item">
              <a class="nav-link" :class="{ 'collapsed': !isTamuOpen }" data-bs-toggle="collapse" href="#tamu-menu" role="button" :aria-expanded="isTamuOpen" aria-controls="tamu-menu">
                <i class="fa-solid fa-users icon"></i>
                <span class="item-name">Daftar Tamu</span>
                <i class="right-icon">
                  <svg class="icon-18" xmlns="http://www.w3.org/2000/svg" width="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </i>
              </a>
              <ul class="sub-nav collapse" :class="{ 'show': isTamuOpen }" id="tamu-menu" data-bs-parent="#sidebar-menu">
                <li class="nav-item">
                  <router-link class="nav-link" :class="{ 'active': $route.path === '/dashboard/tamu' }" to="/dashboard/tamu">
                    <i class="icon"><svg class="icon-10" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor"><g><circle cx="12" cy="12" r="8" fill="currentColor"></circle></g></svg></i>
                    <span class="item-name">List Tamu</span>
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Landing Page Link -->
            <li class="nav-item">
              <router-link class="nav-link" active-class="active" to="/">
                <i class="fa-solid fa-home icon"></i>
                <span class="item-name">Landing Page</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="sidebar-footer"></div>
    </aside>
    <!-- Sidebar End -->

    <!-- Main Content Start -->
    <main class="main-content">
      <!-- Banner Start -->
      <div class="position-relative iq-banner">
        <!-- Nav Start -->
        <nav class="nav navbar navbar-expand-lg navbar-light iq-navbar">
          <div class="container-fluid navbar-inner">
            <a href="#" class="navbar-brand">
              <h4 class="logo-title">BuTaKa</h4>
            </a>
            <div class="sidebar-toggle" @click="toggleSidebar" style="cursor: pointer;">
              <i class="icon">
                <svg width="20px" class="icon-20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </i>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon">
                <span class="mt-2 navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                <li class="nav-item dropdown">
                  <a class="py-0 nav-link d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/assets/images/loader.gif" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"/>
                    <div class="caption ms-3 d-none d-md-block">
                      <h6 class="mb-0 caption-title">Admin</h6>
                      <p class="mb-0 caption-sub-title">Administrator</p>
                    </div>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><router-link class="dropdown-item" to="/login">Logout</router-link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <!-- Nav End -->

        <!-- Nav Header Component Start -->
        <div class="iq-navbar-header" style="height: 215px;">
          <div class="container-fluid iq-container">
            <div class="row">
              <div class="col-md-12">
                <div class="flex-wrap d-flex justify-content-between align-items-center">
                  <div>
                    <h1>Dashboard For Admin BuTaKa</h1>
                    <p>Selamat datang di dashboard admin BuTaKa | Monitoring Buku Tamu Kantor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="iq-header-img">
            <img src="/assets/images/dashboard/top-header.png" alt="header" class="theme-color-default-img img-fluid w-100 h-100 animated-scaleX"/>
          </div>
        </div>
        <!-- Nav Header Component End -->
      </div>
      <!-- Banner End -->

      <!-- Content -->
      <div class="conatiner-fluid content-inner mt-n5 py-0">
        <router-view></router-view>
      </div>
    </main>
    <!-- Main Content End -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(false);
const sidebarCollapsed = ref(false);

// Toggle sidebar
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

// Computed properties for submenu open states
const isResepsionisOpen = computed(() => route.path.startsWith('/dashboard/resepsionis'));
const isTamuOpen = computed(() => route.path.startsWith('/dashboard/tamu'));

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

  // Load Font Awesome
  if (!document.getElementById('font-awesome-cdn')) {
    const link = document.createElement('link');
    link.id = 'font-awesome-cdn';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }

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
  // Remove Tailwind if present
  const tailwind = document.getElementById('tailwind-cdn');
  if (tailwind) tailwind.remove();

  loadHopeUI();
});
</script>
