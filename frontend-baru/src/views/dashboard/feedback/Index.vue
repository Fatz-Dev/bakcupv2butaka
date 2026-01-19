<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow-sm mb-4">
          <div class="card-header d-flex justify-content-between align-items-center py-3">
            <h5 class="mb-0">
              <i class="fa-solid fa-comments me-2"></i>Daftar Feedback Tamu
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div class="row" id="feedback-container">
      <div v-if="loading" class="col-12">
        <div class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-2">Memuat feedback...</p>
        </div>
      </div>
      <div v-else v-for="feedback in feedbackList" :key="feedback.id" class="col-xl-4 col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-0 feedback-card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div>
                <h6 class="mb-0 fw-bold">{{ feedback.name }}</h6>
                <small class="text-muted">{{ feedback.institution }}</small>
              </div>
              <div class="ms-auto">
                <div class="text-warning">
                  <i v-for="n in 5" :key="n" class="small" :class="n <= feedback.rating
                      ? 'fa-solid fa-star'
                      : 'fa-regular fa-star'
                    "></i>
                </div>
              </div>
            </div>
            <p class="card-text text-secondary mb-4" style="font-style: italic">
              "{{ feedback.comment }}"
            </p>
          </div>
          <div class="card-footer bg-transparent border-0 pt-0 pb-3">
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">
                <i class="fa-regular fa-clock me-1"></i>
                {{ formatTime(feedback.created_at) }}
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
      <div v-if="!loading && feedbackList.length === 0" class="col-12">
        <p class="text-center text-muted py-5">Belum ada feedback.</p>
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
const feedbackList = ref([]);
const loading = ref(false);

const fetchFeedback = async () => {
  loading.value = true;
  try {
    const response = await api.get("/feedback");
    if (response.data.success) {
      feedbackList.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    toast({
      title: "Error",
      description: "Gagal mengambil data feedback",
      variant: "destructive",
    });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchFeedback();
});

const formatTime = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const confirmDelete = async (feedback) => {
  const result = await swal.confirm(
    `Hapus feedback dari "${feedback.name}"?`,
    "Tindakan ini tidak dapat dibatalkan.",
    "Ya, Hapus!"
  );

  if (result.isConfirmed) {
    try {
      const response = await api.delete(`/feedback/${feedback.id}`);
      if (response.data.success) {
        toast({
          title: "Berhasil",
          description: "Feedback berhasil dihapus",
        });
        fetchFeedback();
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast({
        title: "Gagal",
        description: "Gagal menghapus feedback",
        variant: "destructive",
      });
    }
  }
};
</script>
