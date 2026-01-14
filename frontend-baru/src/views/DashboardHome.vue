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
                <p class="text-muted mb-0">Berikut adalah ringkasan sistem buku tamu digital (BuTaKa)</p>
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
              <div class="text-center circle-progress-01 circle-progress circle-progress-primary mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                <i class="fa fa-users" style="font-size: 32px; line-height: 80px;"></i>
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
              <div class="text-center circle-progress-01 circle-progress circle-progress-success mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                <i class="fa fa-user-check" style="font-size: 32px; line-height: 80px;"></i>
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
              <div class="text-center circle-progress-01 circle-progress circle-progress-info mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                <i class="fa fa-comment-dots" style="font-size: 32px; line-height: 80px;"></i>
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
              <div class="text-center circle-progress-01 circle-progress circle-progress-warning mb-3" style="width: 80px; height: 80px; margin: 0 auto;">
                <i class="fa fa-star" style="font-size: 32px; line-height: 80px;"></i>
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

    <!-- Action and Info Section -->
    <div class="row">
      <div class="col-md-12 col-lg-6">
        <div class="card" data-aos="fade-up" data-aos-delay="500">
          <div class="card-header">
            <h4 class="card-title">Aksi Cepat</h4>
          </div>
          <div class="card-body text-center py-5">
            <p class="text-muted mb-4">Gunakan pintasan di bawah ini untuk mengelola data kunjungan dan feedback dari tamu kantor.</p>
            <div class="d-flex justify-content-center gap-3">
              <router-link to="/dashboard/tamu" class="btn btn-primary">
                <i class="fa fa-users-cog me-2"></i>Kelola Tamu
              </router-link>
              <router-link to="/dashboard/feedback" class="btn btn-outline-info">
                <i class="fa fa-comment-alt me-2"></i>Data Feedback
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-lg-6">
        <div class="card" data-aos="fade-up" data-aos-delay="600">
          <div class="card-header d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">Ringkasan Sistem</h4>
            </div>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                Status Server
                <span class="badge bg-success rounded-pill">Normal</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                Koneksi Database
                <span class="badge bg-primary rounded-pill">Connected</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                Lapisan Keamanan
                <span class="badge bg-info rounded-pill">Active</span>
              </li>
            </ul>
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
                    <td><span class="fw-medium">{{ visitor.nama }}</span></td>
                    <td>{{ visitor.instansi }}</td>
                    <td>{{ visitor.menemui }}</td>
                    <td>{{ visitor.keperluan }}</td>
                    <td><small class="text-muted">{{ visitor.waktuMasuk }}</small></td>
                    <td>
                      <span class="badge" :class="visitor.status === 'Aktif' ? 'bg-soft-warning text-warning' : 'bg-soft-success text-success'">{{ visitor.status }}</span>
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
import { ref, reactive, computed } from 'vue';

const currentDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
});

const stats = reactive({
  tamuHariIni: 12,
  tamuAktif: 5,
  totalFeedback: 48,
  rataRating: 4.8
});

const recentVisitors = ref([
  { id: 1, nama: 'John Doe', instansi: 'PT. Teknologi Maju', menemui: 'Budi Santoso', keperluan: 'Meeting Kerjasama', waktuMasuk: '09:00, 14 Jan 2026', status: 'Aktif' },
  { id: 2, nama: 'Jane Smith', instansi: 'Dinas Pendidikan', menemui: 'Siti Aminah', keperluan: 'Konsultasi', waktuMasuk: '08:30, 14 Jan 2026', status: 'Selesai' },
  { id: 3, nama: 'Ahmad Fauzi', instansi: 'Universitas ABC', menemui: 'Admin', keperluan: 'Pengambilan Dokumen', waktuMasuk: '10:15, 14 Jan 2026', status: 'Aktif' }
]);
</script>
