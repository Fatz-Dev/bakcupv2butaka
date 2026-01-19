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
                  <i class="fa-solid fa-user-shield me-2"></i>Informasi Akun &
                  Profil
                </h5>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="nama" class="form-label fw-semibold">Nama Lengkap <span
                        class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nama" v-model="form.name"
                      placeholder="Masukkan nama lengkap resepsionis" required />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label fw-semibold">Alamat Email <span
                        class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email" v-model="form.email"
                      placeholder="contoh@email.com" required />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label fw-semibold">Password <span
                        class="text-danger">*</span></label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                        v-model="form.password" placeholder="Minimal 8 karakter" required />
                      <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center px-3"
                        type="button" @click="showPassword = !showPassword">
                        <i class="fa-solid transition-all duration-300"
                          :class="showPassword ? 'fa-eye-slash text-primary' : 'fa-eye'"></i>
                      </button>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="password_confirmation" class="form-label fw-semibold">Konfirmasi Password
                      <span class="text-danger">*</span></label>
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password_confirmation"
                      v-model="form.password_confirmation" placeholder="Ulangi password" required />
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-md-6">
                    <div class="p-3 border rounded d-flex align-items-center bg-light">
                      <div class="form-check form-switch mb-0 ps-5">
                        <input class="form-check-input" type="checkbox" id="is_active" v-model="form.is_active"
                          :true-value="1" :false-value="0" />
                        <label class="form-check-label fw-semibold ms-2 h5 mb-0" for="is_active">
                          Status Akun:
                          <span :class="form.is_active ? 'text-success' : 'text-danger'
                            ">
                            {{ form.is_active ? "Aktif" : "Non-aktif" }}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="my-4" />

                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <i v-if="loading" class="spinner-border spinner-border-sm me-2"></i>
                    <i v-else class="fa-solid fa-save me-2"></i>
                    {{ loading ? "Menyimpan..." : "Simpan Resepsionis" }}
                  </button>
                  <button type="button" class="btn btn-secondary" @click="resetForm" :disabled="loading">
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";

const router = useRouter();
const { toast } = useToast();
const isSubmitting = ref(false);
const loading = ref(false);

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "resepsionis",
  is_active: 1,
});

const resetForm = () => {
  form.name = "";
  form.email = "";
  form.password = "";
  form.password_confirmation = "";
  form.is_active = 1;
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    const response = await api.post("/users", form);
    if (response.data.success) {
      toast({
        title: "Berhasil",
        description: "Resepsionis berhasil ditambahkan!",
      });
      router.push("/dashboard/resepsionis");
    }
  } catch (error) {
    console.error("Error adding resepsionis:", error);
    toast({
      title: "Gagal",
      description:
        error.response?.data?.message || "Gagal menambahkan resepsionis",
      variant: "destructive",
    });
    if (error.response?.data?.errors) {
      console.table(error.response.data.errors);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease-in-out;
}

.duration-300 {
  transition-duration: 300ms;
}
</style>
