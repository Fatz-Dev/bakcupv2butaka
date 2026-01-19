<template>
  <div>
    <!-- Dashboard Content -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="card-title mb-1">Selamat Datang, Admin!</h5>
                <p class="text-muted mb-0">
                  Berikut adalah ringkasan sistem buku tamu digital (BuTaKa)
                </p>
              </div>
              <div class="text-end">
                <small class="text-muted">
                  <i class="fa fa-calendar me-1"></i>
                  {{ currentDate }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row">
      <div class="col-md-6 col-lg-3">
        <div class="card card-slide" data-aos="fade-up" data-aos-delay="100">
          <div class="card-body">
            <div class="progress-widget">
              <div class="text-center circle-progress-01 circle-progress circle-progress-primary mb-3"
                style="width: 80px; height: 80px; margin: 0 auto">
                <i class="fa fa-users" style="font-size: 32px; line-height: 80px"></i>
              </div>
              <div class="progress-detail text-center">
                <p class="mb-2 text-muted">Tamu Hari Ini</p>
                <h3 class="counter mb-0">{{ stats.tamuHariIni }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card card-slide" data-aos="fade-up" data-aos-delay="200">
          <div class="card-body">
            <div class="progress-widget">
              <div class="text-center circle-progress-01 circle-progress circle-progress-success mb-3"
                style="width: 80px; height: 80px; margin: 0 auto">
                <i class="fa fa-user-check" style="font-size: 32px; line-height: 80px"></i>
              </div>
              <div class="progress-detail text-center">
                <p class="mb-2 text-muted">Tamu Aktif</p>
                <h3 class="counter mb-0">{{ stats.tamuAktif }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card card-slide" data-aos="fade-up" data-aos-delay="300">
          <div class="card-body">
            <div class="progress-widget">
              <div class="text-center circle-progress-01 circle-progress circle-progress-info mb-3"
                style="width: 80px; height: 80px; margin: 0 auto">
                <i class="fa fa-comment-dots" style="font-size: 32px; line-height: 80px"></i>
              </div>
              <div class="progress-detail text-center">
                <p class="mb-2 text-muted">Total Feedback</p>
                <h3 class="counter mb-0">{{ stats.totalFeedback }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-3">
        <div class="card card-slide" data-aos="fade-up" data-aos-delay="400">
          <div class="card-body">
            <div class="progress-widget">
              <div class="text-center circle-progress-01 circle-progress circle-progress-warning mb-3"
                style="width: 80px; height: 80px; margin: 0 auto">
                <i class="fa fa-star" style="font-size: 32px; line-height: 80px"></i>
              </div>
              <div class="progress-detail text-center">
                <p class="mb-2 text-muted">Rata-rata Rating</p>
                <h3 class="counter mb-0">{{ stats.rataRating }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Visitors -->
    <div class="row">
      <div class="col-12">
        <div class="card" data-aos="fade-up" data-aos-delay="700">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="header-title">
              <h4 class="card-title">Kunjungan Terbaru</h4>
            </div>
            <router-link to="/dashboard/tamu" class="btn btn-sm btn-primary">
              Lihat Semua <i class="fa fa-arrow-right ms-1"></i>
            </router-link>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Instansi</th>
                    <th>Menemui</th>
                    <th>Keperluan</th>
                    <th>Waktu Masuk</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="visitor in recentVisitors" :key="visitor.id">
                    <td>
                      <span class="fw-medium">{{ visitor.nama }}</span>
                    </td>
                    <td>{{ visitor.instansi }}</td>
                    <td>{{ visitor.menemui }}</td>
                    <td>{{ visitor.keperluan }}</td>
                    <td>
                      <small class="text-muted">{{ visitor.waktuMasuk }}</small>
                    </td>
                    <td>
                      <span class="badge" :class="getStatusClass(visitor.status)">{{ visitor.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "@/services/api";

// Loading & Error states
const loading = ref(true);
const error = ref(null);

// Computed: Tanggal hari ini
const currentDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

// Reactive: Data statistik dashboard
const stats = reactive({
  tamuHariIni: 0,
  tamuAktif: 0,
  totalFeedback: 0,
  rataRating: 0,
});

// Ref: Data pengunjung terbaru
const recentVisitors = ref([]);

// Function: Mengambil data statistik dari API
const fetchStats = async () => {
  try {
    const response = await api.get("/dashboard/stats");
    if (response.data.success) {
      const data = response.data.data;
      stats.tamuHariIni = data.total_visitors_today || 0;
      stats.tamuAktif = data.current_visitors || 0;
      stats.totalFeedback = data.total_feedback || 0;
      stats.rataRating = data.avg_rating || 0;
    }
  } catch (err) {
    console.error("Error fetching stats:", err);
    error.value = "Gagal mengambil data statistik";
  }
};

// Function: Mengambil daftar pengunjung terbaru dari API
const fetchRecentVisitors = async () => {
  try {
    const response = await api.get("/dashboard/recent-visitors");
    if (response.data.success) {
      // Map data dari API ke format yang digunakan template
      recentVisitors.value = response.data.data.map((visitor) => ({
        id: visitor.id,
        nama: visitor.name,
        instansi: visitor.institution || "-",
        menemui: visitor.host_name || "-",
        keperluan: visitor.purpose || "-",
        waktuMasuk: formatDateTime(visitor.check_in_time),
        status: mapStatus(visitor.status),
      }));
    }
  } catch (err) {
    console.error("Error fetching recent visitors:", err);
    error.value = "Gagal mengambil data pengunjung";
  }
};

// Helper: Format tanggal dan waktu
const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Helper: Mapping status dari API ke tampilan
const mapStatus = (status) => {
  const statusMap = {
    menunggu: "Menunggu",
    berkunjung: "Aktif",
    selesai: "Selesai",
  };
  return statusMap[status] || status;
};

// Helper: Mapping status ke class warna badge
const getStatusClass = (status) => {
  const statusClasses = {
    Menunggu: "bg-soft-info text-info",
    Aktif: "bg-soft-warning text-warning",
    Selesai: "bg-soft-success text-success",
  };
  return statusClasses[status] || "bg-soft-secondary text-secondary";
};

// Lifecycle: Fetch data saat komponen dimuat
onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchStats(), fetchRecentVisitors()]);
  loading.value = false;
});
</script>
