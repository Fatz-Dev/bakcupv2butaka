<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <h5 class="mb-0">
              <i class="fa-solid fa-users me-2"></i>Daftar Tamu Hari Ini
            </h5>
            <router-link to="/dashboard/tamu/tambah" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-user-plus me-1"></i> Registrasi Tamu Baru
            </router-link>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-striped" width="100%">
                <thead>
                  <tr>
                    <th width="5%">No</th>
                    <th>Nama Tamu</th>
                    <th>Asal/Instansi</th>
                    <th>Tujuan/Keperluan</th>
                    <th>Waktu Masuk</th>
                    <th>Status</th>
                    <th class="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tamu, index) in tamuList" :key="tamu.id">
                    <td>{{ index + 1 }}</td>
                    <td><strong>{{ tamu.nama }}</strong></td>
                    <td>{{ tamu.instansi }}</td>
                    <td>{{ tamu.keperluan }}</td>
                    <td>{{ tamu.waktuMasuk }}</td>
                    <td>
                      <span class="badge text-uppercase" :class="tamu.status === 'selesai' ? 'bg-success' : 'bg-info'">
                        {{ tamu.status }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group btn-group-sm">
                        <router-link :to="`/dashboard/tamu/${tamu.id}/edit`" class="btn btn-warning" title="Edit">
                          <i class="fas fa-edit"></i>
                        </router-link>
                        <button @click="confirmDelete(tamu)" class="btn btn-danger" title="Hapus">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="tamuList.length === 0">
                    <td colspan="7" class="text-center text-muted py-4">Tidak ada data tamu.</td>
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
import { ref } from 'vue';

const tamuList = ref([
  { id: 1, nama: 'Budi Santoso', instansi: 'PT. Maju Jaya', keperluan: 'Meeting dengan HRD', waktuMasuk: '08:00 WIB', status: 'selesai' },
  { id: 2, nama: 'Siti Aminah', instansi: 'Individu', keperluan: 'Mengantar Paket', waktuMasuk: '09:30 WIB', status: 'berkunjung' }
]);

const confirmDelete = (tamu) => {
  if (confirm(`Hapus tamu "${tamu.nama}"?`)) {
    tamuList.value = tamuList.value.filter(t => t.id !== tamu.id);
  }
};
</script>
