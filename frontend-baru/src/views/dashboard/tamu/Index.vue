<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <h5 class="mb-0">
              <i class="fa-solid fa-users me-2"></i>Daftar Tamu Hari Ini
            </h5>
            <router-link to="/dashboard/tamu/create" class="btn btn-primary btn-sm">
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
                  <tr v-if="loading">
                    <td colspan="7" class="text-center py-4">
                      <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      Memuat data tamu...
                    </td>
                  </tr>
                  <tr v-else v-for="(tamu, index) in tamuList" :key="tamu.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <strong>{{ tamu.name }}</strong>
                    </td>
                    <td>{{ tamu.institution || "Individu" }}</td>
                    <td>{{ tamu.purpose }}</td>
                    <td>{{ formatTime(tamu.check_in_time) }}</td>
                    <td>
                      <span class="badge text-uppercase" :class="getStatusClass(tamu.status)">
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
                  <tr v-if="!loading && tamuList.length === 0">
                    <td colspan="7" class="text-center text-muted py-4">
                      Tidak ada data tamu.
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
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";
import swal from "@/lib/swal";

const { toast } = useToast();
const tamuList = ref([]);
const loading = ref(false);

const fetchTamu = async () => {
  loading.value = true;
  try {
    const response = await api.get("/visitors");
    if (response.data.success) {
      tamuList.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching tamu:", error);
    toast({
      title: "Error",
      description: "Gagal mengambil data tamu",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTamu();
});

const formatTime = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return (
    date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) +
    " WIB"
  );
};

const getStatusClass = (status) => {
  const classes = {
    selesai: "bg-success",
    berkunjung: "bg-info",
    menunggu: "bg-warning",
  };
  return classes[status] || "bg-secondary";
};

const confirmDelete = async (tamu) => {
  const result = await swal.confirm(
    `Hapus tamu "${tamu.name}"?`,
    "Data ini akan dihapus secara permanen.",
    "Ya, Hapus!"
  );

  if (result.isConfirmed) {
    try {
      const response = await api.delete(`/visitors/${tamu.id}`);
      if (response.data.success) {
        toast({
          title: "Berhasil",
          description: "Data tamu berhasil dihapus",
        });
        fetchTamu();
      }
    } catch (error) {
      console.error("Error deleting tamu:", error);
      toast({
        title: "Gagal",
        description: "Gagal menghapus data tamu",
        variant: "destructive",
      });
    }
  }
};
</script>
