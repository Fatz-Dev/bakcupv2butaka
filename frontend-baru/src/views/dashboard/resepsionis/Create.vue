<template>
  <div>
    <!-- Header -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center mb-4">
        <div class="header-title">
          <h4 class="card-title">
            <i class="fa-solid fa-user-plus me-2"></i>Tambah Resepsionis Baru
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
                    <label for="password" class="form-label fw-semibold">Password <span class="text-danger">*</span></label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="form.password" placeholder="Masukkan password minimal 6 karakter" required />
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
                    <i class="fa-solid fa-save me-2"></i>Simpan Resepsionis
                  </button>
                  <button type="reset" class="btn btn-secondary" @click="resetForm">
                    <i class="fa-solid fa-redo me-2"></i>Reset Form
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
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPassword = ref(false);

const form = reactive({
  nama: '',
  username: '',
  email: '',
  password: '',
  telepon: ''
});

const resetForm = () => {
  form.nama = '';
  form.username = '';
  form.email = '';
  form.password = '';
  form.telepon = '';
};

const handleSubmit = () => {
  console.log('Form submitted:', form);
  alert('Resepsionis berhasil ditambahkan!');
  // TODO: API call
  router.push('/dashboard/resepsionis');
};
</script>
