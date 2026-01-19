<template>
  <div>
    <!--  HEADER  -->
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center mb-4">
        <div class="header-title">
          <h4 class="card-title mb-0">
            <i class="fa-solid fa-users me-2"></i>Daftar Resepsionis
          </h4>
        </div>
      </div>
    </div>

    <!-- CONTENT -->
    <div class="row">
      <div class="col-md-12 mb-4">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-user-shield me-2"></i>Daftar Resepsionis
              Aktif
            </h5>
            <router-link to="/dashboard/resepsionis/create" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-user-plus me-1"></i> Tambah Resepsionis
            </router-link>
          </div>

          <div class="card-body">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text border-end-0">
                  <i class="fa-solid fa-magnifying-glass text-muted"></i>
                </span>
                <input type="text" class="form-control border-start-0 ps-0" v-model="searchQuery"
                  placeholder="Cari nama atau username..." />
              </div>
            </div>

            <div class="table-responsive">
              <table class="table table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th width="5%">No</th>
                    <th width="25%">Nama Lengkap</th>
                    <th width="20%">Username</th>
                    <th width="20%">Email</th>
                    <th width="15%">Role</th>
                    <th width="15%">Status</th>
                    <th width="15%" class="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="6" class="text-center py-4">
                      <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                      Memuat data...
                    </td>
                  </tr>
                  <tr v-for="(item, index) in filteredList" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td class="fw-semibold">{{ item.name }}</td>
                    <td>{{ item.email.split("@")[0] }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                      <span class="badge bg-primary">{{ item.role }}</span>
                    </td>
                    <td>
                      <span :class="['badge', item.is_active ? 'bg-success' : 'bg-secondary']">
                        {{ item.is_active ? 'Aktif' : 'Non-aktif' }}
                      </span>
                    </td>
                    <td class="text-center">
                      <router-link :to="`/dashboard/resepsionis/${item.id}/edit`" class="btn btn-sm btn-warning me-1"
                        title="Edit">
                        <i class="fa-solid fa-edit"></i>
                      </router-link>
                      <button @click="confirmDelete(item)" class="btn btn-sm btn-danger" title="Hapus">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredList.length === 0">
                    <td colspan="6" class="text-center text-muted py-4">
                      Tidak ada data resepsionis.
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
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";
import { useToast } from "@/components/ui/toast/use-toast";
import swal from "@/lib/swal";

const { toast } = useToast();
const searchQuery = ref("");
const loading = ref(false);
const resepsionisList = ref([]);

const fetchResepsionis = async () => {
  loading.value = true;
  try {
    const response = await api.get("/users?role=resepsionis");
    if (response.data.success) {
      resepsionisList.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching resepsionis:", error);
    toast({
      title: "Error",
      description: "Gagal mengambil data resepsionis",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchResepsionis();
});

const filteredList = computed(() => {
  if (!searchQuery.value) return resepsionisList.value;
  const q = searchQuery.value.toLowerCase();
  return resepsionisList.value.filter(
    (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q)
  );
});

const confirmDelete = async (item) => {
  const result = await swal.confirm(
    `Hapus resepsionis "${item.name}"?`,
    "Tindakan ini tidak dapat dibatalkan.",
    "Ya, Hapus!"
  );

  if (result.isConfirmed) {
    try {
      const response = await api.delete(`/users/${item.id}`);
      if (response.data.success) {
        toast({
          title: "Berhasil",
          description: "Resepsionis berhasil dihapus",
        });
        fetchResepsionis();
      }
    } catch (error) {
      console.error("Error deleting resepsionis:", error);
      toast({
        title: "Gagal",
        description:
          error.response?.data?.message || "Gagal menghapus resepsionis",
        variant: "destructive",
      });
    }
  }
};
</script>
