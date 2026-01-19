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
                  <i class="fa-solid fa-user-shield me-2"></i>Informasi Akun &
                  Profil
                </h5>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="nama" class="form-label fw-semibold">Nama Lengkap <span
                        class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="nama" v-model="form.name" placeholder="Nama lengkap"
                      required />
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label fw-semibold">Alamat Email <span
                        class="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email" v-model="form.email"
                      placeholder="contoh@email.com" required />
                  </div>
                </div>

                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label fw-semibold">Password Baru
                      <small class="text-muted">(Kosongkan jika tidak diubah)</small></label>
                    <div class="input-group">
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                        v-model="form.password" placeholder="Masukkan password baru" />
                      <button class="btn btn-outline-secondary d-flex align-items-center justify-content-center px-3"
                        type="button" @click="showPassword = !showPassword">
                        <i class="fa-solid transition-all duration-300"
                          :class="showPassword ? 'fa-eye-slash text-primary' : 'fa-eye'"></i>
                      </button>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3" v-if="form.password">
                    <label for="password_confirmation" class="form-label fw-semibold">Konfirmasi Password Baru</label>
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password_confirmation"
                      v-model="form.password_confirmation" placeholder="Ulangi password baru" />
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
                    <button type="submit" class="btn btn-primary" :disabled="submitting">
                      <i v-if="submitting" class="spinner-border spinner-border-sm me-2"></i>
                      <i v-else class="fa-solid fa-save me-2"></i>
                      {{ submitting ? "Memperbarui..." : "Update Resepsionis" }}
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
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";

const router = useRouter();
const route = useRoute();
const { toast } = useToast();
const showPassword = ref(false);
const submitting = ref(false);
const loading = ref(true);

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "resepsionis",
  is_active: 1,
});

const fetchResepsionis = async () => {
  const id = route.params.id;
  loading.value = true;
  try {
    const response = await api.get(`/users/${id}`);
    if (response.data.success) {
      const data = response.data.data;
      form.name = data.name;
      form.email = data.email;
      form.role = data.role;
      form.is_active = data.is_active;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    toast({
      title: "Error",
      description: "Gagal mengambil data resepsionis",
      variant: "destructive",
    });
    router.push("/dashboard/resepsionis");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchResepsionis();
});

const handleSubmit = async () => {
  const id = route.params.id;
  submitting.value = true;

  // Clean empty password to avoid validation error if not changing
  const payload = { ...form };
  if (!payload.password) {
    delete payload.password;
    delete payload.password_confirmation;
  }

  try {
    const response = await api.put(`/users/${id}`, payload);
    if (response.data.success) {
      toast({
        title: "Berhasil",
        description: "Resepsionis berhasil diupdate!",
      });
      router.push("/dashboard/resepsionis");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    toast({
      title: "Gagal",
      description: error.response?.data?.message || "Gagal mengupdate data",
      variant: "destructive",
    });
  } finally {
    submitting.value = false;
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
