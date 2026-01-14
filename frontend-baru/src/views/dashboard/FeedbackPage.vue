<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-sm mb-4">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <h5 class="mb-0">
              <i class="fa-solid fa-comments me-2"></i>Daftar Feedback Tamu
            </h5>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm">
                <i class="fa-solid fa-filter me-1"></i> Filter
              </button>
              <button class="btn btn-primary btn-sm">
                <i class="fa-solid fa-download me-1"></i> Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row" id="feedback-container">
      <div v-for="feedback in feedbackList" :key="feedback.id" class="col-xl-4 col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-0 feedback-card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div>
                <h6 class="mb-0 fw-bold">{{ feedback.nama }}</h6>
                <small class="text-muted">{{ feedback.instansi }}</small>
              </div>
              <div class="ms-auto">
                <div class="text-warning">
                  <i v-for="n in 5" :key="n" class="small" :class="n <= feedback.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                </div>
              </div>
            </div>
            <p class="card-text text-secondary mb-4" style="font-style: italic;">
              "{{ feedback.pesan }}"
            </p>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0 pb-3">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <i class="fa-regular fa-clock me-1"></i>
                {{ feedback.waktu }}
              </small>
              <div class="btn-group btn-group-sm">
                <button @click="confirmDelete(feedback)" class="btn btn-outline-danger border-0" title="Hapus">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="feedbackList.length === 0" class="col-12">
        <p class="text-center text-muted py-5">Belum ada feedback.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const feedbackList = ref([
  { id: 1, nama: 'Ahmad Dhani', instansi: 'PT. Maju Mundur', rating: 5, pesan: 'Pelayanan sangat ramah dan proses cepat. Terima kasih!', waktu: '14 Jan 2026, 09:30' },
  { id: 2, nama: 'Sarah Tumiwa', instansi: 'SMK N 1 Jakarta', rating: 4, pesan: 'Fasilitas ruang tunggu sangat nyaman dan bersih.', waktu: '13 Jan 2026, 14:15' },
  { id: 3, nama: 'Rudi Hartono', instansi: 'Freelancer', rating: 5, pesan: 'Proses check-in cepat dan efisien!', waktu: '12 Jan 2026, 10:00' }
]);

const confirmDelete = (feedback) => {
  if (confirm(`Hapus feedback dari "${feedback.nama}"?`)) {
    feedbackList.value = feedbackList.value.filter(f => f.id !== feedback.id);
  }
};
</script>
