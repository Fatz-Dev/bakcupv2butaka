<template>
  <div>
    <!-- Header -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center mb-4">
        <div class="header-title">
          <h4 class="card-title">
            <i class="fa-solid fa-user-edit me-2"></i>Edit Resepsionis
          </h4>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-lg-12 mx-auto">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="handleSubmit" id="formResepsionis">
                <h5 class="mb-3">
                  <i class="fa-solid fa-user-shield me-2"></i>Informasi Akun & Profil
                </h5>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="nama" class="form-label fw-semibold">Nama Lengkap <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nama" v-model="form.nama" placeholder="Masukkan nama lengkap resepsionis" required />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="username" class="form-label fw-semibold">Username <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="username" v-model="form.username" placeholder="Masukkan username untuk login" required />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label fw-semibold">Alamat Email</label>
                    <input type="email" class="form-control" id="email" v-model="form.email" placeholder="contoh@email.com" />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label fw-semibold">Password Baru <small class="text-muted">(Kosongkan jika tidak diubah)</small></label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="form.password" placeholder="Masukkan password baru" />
                      <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                        <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="no_hp" class="form-label fw-semibold">No. WhatsApp/HP</label>
                    <input type="text" class="form-control" id="no_hp" v-model="form.telepon" placeholder="08xxxxxxxx" />
                  </div>
                </div>

                <hr class="my-4" />

                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary">
                    <i class="fa-solid fa-save me-2"></i>Update Resepsionis
                  </button>
                  <router-link to="/dashboard/resepsionis" class="btn btn-danger">
                    <i class="fa-solid fa-times me-2"></i>Batal
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const showPassword = ref(false);

const form = reactive({
  nama: '',
  username: '',
  email: '',
  password: '',
  telepon: ''
});

// Simulated data fetch
onMounted(() => {
  const id = route.params.id;
  // TODO: Fetch from API
  // Simulated data
  const dummyData = {
    1: { nama: 'Budi Santoso', username: 'budisantoso', email: 'budi@example.com', telepon: '081234567890' },
    2: { nama: 'Siti Aminah', username: 'sitiaminah', email: 'siti@example.com', telepon: '089876543210' }
  };
  
  if (dummyData[id]) {
    Object.assign(form, dummyData[id]);
  }
});

const handleSubmit = () => {
  console.log('Form updated:', form);
  alert('Resepsionis berhasil diupdate!');
  // TODO: API call
  router.push('/dashboard/resepsionis');
};
</script>
