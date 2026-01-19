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
                  <label for="nama_tamu" class="form-label fw-semibold"
                    >Nama Lengkap <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.name"
                    class="form-control"
                    id="nama_tamu"
                    placeholder="Nama sesuai KTP"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="instansi" class="form-label fw-semibold"
                    >Asal / Instansi <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.institution"
                    class="form-control"
                    id="instansi"
                    placeholder="Contoh: PT. ABC / Universitas X"
                    required
                  />
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="no_hp" class="form-label fw-semibold"
                    >No. WhatsApp/HP <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.phone"
                    class="form-control"
                    id="no_hp"
                    placeholder="08xxxxxxxx"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label fw-semibold"
                    >Alamat Email (Opsional)</label
                  >
                  <input
                    type="email"
                    v-model="form.email"
                    class="form-control"
                    id="email"
                    placeholder="contoh@email.com"
                  />
                </div>
              </div>

              <hr class="my-4" />

              <!-- Informasi Kunjungan -->
              <h6 class="mb-3 fw-bold text-secondary">
                <i class="fa-solid fa-briefcase me-2"></i>Detail Kunjungan
              </h6>
              <div class="row mb-3">
                <div class="col-md-6 mb-3">
                  <label for="tujuan_bertemu" class="form-label fw-semibold"
                    >Bertemu Dengan <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    v-model="form.host_name"
                    class="form-control"
                    id="tujuan_bertemu"
                    placeholder="Nama orang atau divisi yang dituju"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="status_kunjungan" class="form-label fw-semibold"
                    >Status <span class="text-danger">*</span></label
                  >
                  <select
                    v-model="form.status"
                    class="form-select"
                    id="status_kunjungan"
                    required
                  >
                    <option value="menunggu">Menunggu</option>
                    <option value="berkunjung">Sedang Berkunjung</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="keperluan" class="form-label fw-semibold"
                  >Keperluan Kunjungan <span class="text-danger">*</span></label
                >
                <textarea
                  v-model="form.purpose"
                  class="form-control"
                  id="keperluan"
                  rows="3"
                  placeholder="Jelaskan secara singkat tujuan kunjungan Anda"
                  required
                ></textarea>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between py-3">
              <router-link to="/dashboard/tamu" class="btn btn-secondary">
                <i class="fas fa-arrow-left me-2"></i>Kembali
              </router-link>
              <button
                type="submit"
                class="btn btn-primary px-4"
                :disabled="submitting"
              >
                <i
                  v-if="submitting"
                  class="spinner-border spinner-border-sm me-2"
                ></i>
                <i v-else class="fas fa-save me-2"></i>
                {{ submitting ? "Memperbarui..." : "Update Data Tamu" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";

const router = useRouter();
const route = useRoute();
const { toast } = useToast();
const loading = ref(true);
const submitting = ref(false);

const form = reactive({
  name: "",
  institution: "",
  phone: "",
  email: "",
  host_name: "",
  status: "berkunjung",
  purpose: "",
});

const fetchTamu = async () => {
  const id = route.params.id;
  loading.value = true;
  try {
    const response = await api.get(`/visitors/${id}`);
    if (response.data.success) {
      const data = response.data.data;
      form.name = data.name;
      form.institution = data.institution;
      form.phone = data.phone;
      form.email = data.email || "";
      form.host_name = data.host_name;
      form.status = data.status;
      form.purpose = data.purpose;
    }
  } catch (error) {
    console.error("Error fetching tamu:", error);
    toast({
      title: "Error",
      description: "Gagal mengambil data tamu",
      variant: "destructive",
    });
    router.push("/dashboard/tamu");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTamu();
});

const handleSubmit = async () => {
  const id = route.params.id;
  submitting.value = true;
  try {
    const response = await api.put(`/visitors/${id}`, form);
    if (response.data.success) {
      toast({
        title: "Berhasil",
        description: "Data tamu berhasil diupdate!",
      });
      router.push("/dashboard/tamu");
    }
  } catch (error) {
    console.error("Error updating tamu:", error);
    toast({
      title: "Gagal",
      description:
        error.response?.data?.message || "Gagal mengupdate data tamu",
      variant: "destructive",
    });
  } finally {
    submitting.value = false;
  }
};
</script>
