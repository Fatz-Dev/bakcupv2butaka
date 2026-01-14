<template>
  <div>
    <div class="card">
      <div class="card-header py-3 mb-2">
        <h5 class="mb-0">
          <i class="fa-solid fa-user-edit me-2 text-primary"></i>Edit Data Tamu
        </h5>
      </div>
    </div>

    <div class="card pt-4">
      <div class="row">
        <div class="col-12 px-4 shadow-sm">
          <form @submit.prevent="handleSubmit">
            <div class="card-body">
              <!-- Informasi Tamu -->
              <h6 class="mb-3 fw-bold text-secondary">
                <i class="fa-solid fa-id-card me-2"></i>Informasi Identitas
              </h6>
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="nama_tamu" class="form-label fw-semibold">Nama Lengkap <span class="text-danger">*</span></label>
                  <input type="text" v-model="form.nama" class="form-control" id="nama_tamu" placeholder="Nama sesuai KTP" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="instansi" class="form-label fw-semibold">Asal / Instansi <span class="text-danger">*</span></label>
                  <input type="text" v-model="form.instansi" class="form-control" id="instansi" placeholder="Contoh: PT. ABC / Universitas X" required />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="no_hp" class="form-label fw-semibold">No. WhatsApp/HP <span class="text-danger">*</span></label>
                  <input type="text" v-model="form.telepon" class="form-control" id="no_hp" placeholder="08xxxxxxxx" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label fw-semibold">Alamat Email (Opsional)</label>
                  <input type="email" v-model="form.email" class="form-control" id="email" placeholder="contoh@email.com" />
                </div>
              </div>

              <hr class="my-4" />

              <!-- Informasi Kunjungan -->
              <h6 class="mb-3 fw-bold text-secondary">
                <i class="fa-solid fa-briefcase me-2"></i>Detail Kunjungan
              </h6>
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="tujuan_bertemu" class="form-label fw-semibold">Bertemu Dengan <span class="text-danger">*</span></label>
                  <input type="text" v-model="form.tujuanBertemu" class="form-control" id="tujuan_bertemu" placeholder="Nama orang atau divisi yang dituju" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="status_kunjungan" class="form-label fw-semibold">Status <span class="text-danger">*</span></label>
                  <select v-model="form.status" class="form-select" id="status_kunjungan" required>
                    <option value="menunggu">Menunggu</option>
                    <option value="berkunjung">Sedang Berkunjung</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="keperluan" class="form-label fw-semibold">Keperluan Kunjungan <span class="text-danger">*</span></label>
                <textarea v-model="form.keperluan" class="form-control" id="keperluan" rows="3" placeholder="Jelaskan secara singkat tujuan kunjungan Anda" required></textarea>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between py-3">
              <router-link to="/dashboard/tamu" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i>Kembali
              </router-link>
              <button type="submit" class="btn btn-primary px-4">
                <i class="fas fa-save me-2"></i>Update Data Tamu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const form = reactive({
  nama: '',
  instansi: '',
  telepon: '',
  email: '',
  tujuanBertemu: '',
  status: 'berkunjung',
  keperluan: ''
});

onMounted(() => {
  const id = route.params.id;
  // TODO: Fetch from API
  const dummyData = {
    1: { nama: 'Budi Santoso', instansi: 'PT. Maju Jaya', telepon: '081234567890', email: '', tujuanBertemu: 'HRD', status: 'selesai', keperluan: 'Meeting dengan HRD' },
    2: { nama: 'Siti Aminah', instansi: 'Individu', telepon: '089876543210', email: '', tujuanBertemu: 'Resepsionis', status: 'berkunjung', keperluan: 'Mengantar Paket' }
  };
  
  if (dummyData[id]) {
    Object.assign(form, dummyData[id]);
  }
});

const handleSubmit = () => {
  console.log('Form updated:', form);
  alert('Data tamu berhasil diupdate!');
  // TODO: API call
  router.push('/dashboard/tamu');
};
</script>
