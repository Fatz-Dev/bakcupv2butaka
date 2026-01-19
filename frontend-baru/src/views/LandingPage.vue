<template>
  <div
    class="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-body text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <!-- Navigation -->
    <header
      class="sticky top-0 z-50 border-slate-200 dark:border-slate-800 px-6 md:px-12 py-4 shadow-sm transition-colors duration-300">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl shadow-md dark:shadow-none">
            <img src="/assets/images/loader.gif" alt="Logo" class="h-8 w-8 rounded-md bg-white" />
          </div>
          <span class="text-xl font-display font-extrabold tracking-tight text-slate-800 dark:text-white">BuTaKa</span>
        </div>
        <div class="flex items-center gap-4 md:gap-8">
          <!-- Theme Toggle Button -->
          <button @click="toggleTheme"
            class="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90">
            <span class="material-symbols-outlined block dark:hidden">dark_mode</span>
            <span class="material-symbols-outlined hidden dark:block">light_mode</span>
          </button>
          <div v-if="!auth.isAuthenticated.value"></div>
          <div v-else class="flex items-center gap-4">
            <router-link v-if="auth.userRole.value === 'admin'" to="/dashboard"
              class="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors">
              Ke Dashboard
            </router-link>
            <button @click="handleLogout"
              class="px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center py-12 px-6 md:px-12">
      <div class="w-full max-w-6xl space-y-16">
        <!-- resepsionis table -->
        <div v-if="
          auth.isAuthenticated.value && auth.userRole.value === 'resepsionis'
        " class="grid md:grid-cols-3 gap-12">
          <div class="md:col-span-3">
            <div
              class="w-full bg-white dark:bg-surface-dark rounded-[1rem] shadow-glass dark:shadow-glass-dark border border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden"
              data-aos="fade-up">
              <div
                class="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 class="text-xl font-display font-bold text-slate-800 dark:text-white">
                      Daftar Kunjungan Terbaru
                    </h2>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                      Data real-time tamu hari ini
                    </p>
                  </div>
                  <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <!-- Search Bar -->
                    <div class="relative flex-grow md:flex-grow-0">
                      <span
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-sm">search</span>
                      <input type="text" v-model="searchQuery"
                        class="w-full md:w-64 pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="Cari nama atau instansi..." />
                    </div>
                    <div
                      class="flex items-center gap-2 px-3 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-[10px] font-bold uppercase tracking-tighter">
                      <span class="relative flex h-2 w-2">
                        <span
                          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                      </span>
                      Live Records
                    </div>
                  </div>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-slate-50/50 dark:bg-slate-900/50">
                      <th
                        class="px-6 py-4 text-[11px] font-extrabold text-slate-900 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        No
                      </th>
                      <th
                        class="px-6 py-4 text-[11px] font-extrabold text-slate-900 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        Nama Tamu
                      </th>
                      <th
                        class="px-6 py-4 text-[11px] font-extrabold text-slate-900 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        Keperluan
                      </th>
                      <th
                        class="px-6 py-4 text-[11px] font-extrabold text-slate-900 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        Waktu Masuk
                      </th>
                      <th
                        class="px-6 py-4 text-[11px] font-extrabold text-slate-900 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        Status
                      </th>
                      <th
                        class="px-6 py-4 text-[11px] font-extrabold text-slate-900 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-50 dark:divide-slate-800">
                    <tr v-if="loadingVisitors">
                      <td colspan="6" class="px-6 py-12 text-center text-slate-500">
                        <span class="spinner-border spinner-border-sm me-2"></span>
                        Memuat data kunjungan...
                      </td>
                    </tr>
                    <tr v-else-if="errorVisitors">
                      <td colspan="6" class="px-6 py-12 text-center text-red-500">
                        <span class="material-symbols-outlined text-4xl mb-2 block">error</span>
                        Gagal memuat data kunjungan. Silakan refresh halaman.
                      </td>
                    </tr>
                    <tr v-else-if="visitors.length === 0">
                      <td colspan="6" class="px-6 py-12 text-center">
                        <span
                          class="material-symbols-outlined text-slate-200 dark:text-slate-800 text-5xl mb-3 block">group_off</span>
                        <p class="text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                          Belum ada tamu yang mendaftar hari ini.
                        </p>
                      </td>
                    </tr>
                    <tr v-for="(row, index) in filteredVisitors" :key="row.id"
                      class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td class="px-6 py-5 text-sm font-medium text-slate-900 dark:text-slate-600">
                        {{ String(index + 1).padStart(2, "0") }}
                      </td>
                      <td class="px-6 py-5">
                        <div class="flex items-center gap-3">
                          <div class="text-slate-900 dark:text-slate-200">
                            <p class="text-sm font-bold visitor-name">
                              {{ row.name }}
                            </p>
                            <p
                              class="text-[10px] text-slate-500 visitor-instansi bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded mt-1 inline-block">
                              {{ row.institution || "Individu" }}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-5">
                        <p class="text-sm">{{ row.purpose || "-" }}</p>
                        <p class="text-[10px] flex items-center gap-1">
                          <span class="material-symbols-outlined text-[12px]">person</span>
                          Menemui: {{ row.host_name || "-" }}
                        </p>
                      </td>
                      <td class="px-6 py-5">
                        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {{ formatTime(row.check_in_time) }}
                        </p>
                        <p class="text-[10px] text-slate-400 dark:text-slate-500">
                          {{ formatDate(row.check_in_time) }}
                        </p>
                      </td>
                      <td class="px-6 py-5">
                        <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                          :class="getStatusClass(row)">
                          {{ row.check_out_time ? "Selesai" : "Menunggu" }}
                        </span>
                      </td>
                      <td class="px-6 py-5">
                        <div class="justify-center gap-2">
                          <button v-if="
                            !row.check_out_time &&
                            auth.userRole.value === 'resepsionis'
                          " @click="confirmCheckout(row)"
                            class="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-xs">logout</span>
                            Check-out
                          </button>
                          <span v-else-if="row.check_out_time" class="text-[10px] text-emerald-600 font-bold">
                            Sudah Keluar
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Guest Form -->
        <div v-if="auth.userRole.value !== 'resepsionis'" class="grid md:grid-cols-3 gap-12">
          <div class="md:col-span-3">
            <div
              class="bg-white dark:bg-surface-dark rounded-[1rem] shadow-glass dark:shadow-glass-dark border border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
              <div
                class="p-8 md:p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <h2 class="text-2xl font-display font-bold text-slate-800 dark:text-white">
                  Isi Buku Tamu
                </h2>
                <p class="text-slate-500 dark:text-slate-400 mt-1">
                  Silakan lengkapi data kunjungan Anda
                </p>
              </div>

              <form @submit.prevent="submitGuest" class="p-8 md:p-10 space-y-8">
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nama Lengkap</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">person</span>
                      <input type="text" v-model="guestForm.nama"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="Nama lengkap Anda" required />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Instansi /
                      Perusahaan</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">apartment</span>
                      <input type="text" v-model="guestForm.instansi"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="Organisasi atau pribadi" required />
                    </div>
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nomor Telepon / WA</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">call</span>
                      <input type="tel" v-model="guestForm.telepon"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="0812xxxx" required />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email (Opsional)</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">mail</span>
                      <input type="email" v-model="guestForm.email"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="nama@email.com" />
                    </div>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Menemui (Pejabat /
                    Staf)</label>
                  <div class="relative group">
                    <span
                      class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">person_search</span>
                    <input type="text" v-model="guestForm.tujuan_staf"
                      class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                      placeholder="Siapa yang ingin Anda temui?" required />
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Keperluan Kunjungan</label>
                  <textarea v-model="guestForm.keperluan"
                    class="w-full p-6 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 min-h-[120px]"
                    placeholder="Berikan alasan atau detail kunjungan Anda..." required></textarea>
                </div>

                <button type="submit" :disabled="isSubmittingGuest"
                  class="w-full py-5 bg-slate-900 dark:bg-primary-900/80 hover:bg-slate-800 dark:hover:bg-primary-900/60 text-white font-extrabold rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                  <span v-if="isSubmittingGuest" class="spinner-border spinner-border-sm"></span>
                  <span v-else class="material-symbols-outlined">how_to_reg</span>
                  {{
                    isSubmittingGuest
                      ? "Mendaftarkan..."
                      : "Daftar Kunjungan Sekarang"
                  }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Feedback Form -->
        <div v-if="auth.userRole.value !== 'resepsionis'" class="grid md:grid-cols-3 gap-12">
          <div class="md:col-span-3">
            <div
              class="bg-white dark:bg-surface-dark rounded-[1rem] shadow-glass dark:shadow-glass-dark border border-slate-100 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
              <div
                class="p-8 md:p-10 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <h2 class="text-2xl font-display font-bold text-slate-800 dark:text-white">
                  Tulis Feedback
                </h2>
                <p class="text-slate-500 dark:text-slate-400 mt-1">
                  Hanya butuh waktu sebentar
                </p>
              </div>

              <form @submit.prevent="submitFeedback" class="p-8 md:p-10 space-y-8">
                <div class="grid md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nama Lengkap</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">person</span>
                      <input type="text" v-model="feedbackForm.nama"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="Masukkan nama Anda" required />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Instansi /
                      Perusahaan</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">apartment</span>
                      <input type="text" v-model="feedbackForm.instansi"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="Pekerjaan atau organisasi" />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email (Opsional)</label>
                    <div class="relative group">
                      <span
                        class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined transition-colors group-focus-within:text-primary-600 dark:group-focus-within:text-primary-400">mail</span>
                      <input type="email" v-model="feedbackForm.email"
                        class="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                        placeholder="nama@email.com" />
                    </div>
                  </div>
                </div>

                <div
                  class="space-y-3 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300 block text-center">Bagaimana
                    kualitas layanan kami?</label>
                  <div class="flex justify-center gap-3 star-rating">
                    <button v-for="star in 5" :key="star" type="button" @click="setRating(star)"
                      @mouseenter="hoverRating = star" @mouseleave="hoverRating = 0"
                      class="text-slate-300 dark:text-slate-700 hover:text-amber-400 transition-all">
                      <span class="material-symbols-outlined text-[42px]" :class="{
                        'star-active':
                          star <= (hoverRating || feedbackForm.rating),
                      }">star</span>
                    </button>
                  </div>
                  <p class="text-xs text-slate-400 dark:text-slate-500 text-center uppercase tracking-widest font-bold pt-2"
                    :class="{
                      'text-primary-600 dark:text-primary-400':
                        feedbackForm.rating > 0,
                    }">
                    {{ ratingLabel }}
                  </p>
                </div>

                <div class="space-y-2">
                  <label class="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Pesan Feedback</label>
                  <textarea v-model="feedbackForm.pesan"
                    class="w-full p-6 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 min-h-[160px]"
                    placeholder="Bagikan apa yang Anda rasakan selama berkunjung..." required></textarea>
                </div>

                <button type="submit" :disabled="isSubmittingFeedback"
                  class="w-full py-5 bg-primary-900/80 dark:bg-primary-900/80 hover:bg-primary-900/60 dark:hover:bg-primary-900/60 text-white font-extrabold rounded-2xl shadow-xl shadow-primary-200 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                  <span v-if="isSubmittingFeedback" class="spinner-border spinner-border-sm"></span>
                  <span v-else class="material-symbols-outlined">send</span>
                  {{
                    isSubmittingFeedback
                      ? "Mengirim..."
                      : "Kirim Feedback Sekarang"
                  }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-12 border-t border-slate-200 dark:border-slate-800 text-center transition-colors duration-300">
      <p class="text-slate-400 dark:text-slate-500 text-sm font-medium">
        © 2025 BuTaKa. All rights reserved.
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import api from "@/services/api";
import swal from "@/lib/swal";
import { useToast } from "@/components/ui/toast/use-toast";

const router = useRouter();
const auth = useAuthStore();
const { toast } = useToast();

// Form Loading States
const isSubmittingGuest = ref(false);
const isSubmittingFeedback = ref(false);

// Visitor Records State
const visitors = ref([]);
const loadingVisitors = ref(false);
const errorVisitors = ref(false);
const searchQuery = ref("");

const filteredVisitors = computed(() => {
  if (!searchQuery.value) return visitors.value;
  const query = searchQuery.value.toLowerCase();
  return visitors.value.filter(
    (v) =>
      v.name.toLowerCase().includes(query) ||
      (v.institution && v.institution.toLowerCase().includes(query))
  );
});

const fetchVisitors = async () => {
  loadingVisitors.value = true;
  errorVisitors.value = false;
  try {
    const response = await api.get("/visitors/recent");
    if (response.data.success) {
      visitors.value = response.data.data;
    }
  } catch (error) {
    console.error("Error fetching visitors:", error);
    errorVisitors.value = true;
  } finally {
    loadingVisitors.value = false;
  }
};

const formatTime = (dateTime) => {
  if (!dateTime) return "-";
  return new Date(dateTime).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (dateTime) => {
  if (!dateTime) return "-";
  return new Date(dateTime).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusClass = (row) => {
  return row.check_out_time
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
};

const confirmCheckout = async (visitor) => {
  const result = await swal.confirm(
    `Konfirmasi check-out untuk ${visitor.name}?`,
    "Data kunjungan akan ditutup."
  );
  if (result.isConfirmed) {
    try {
      const response = await api.post(`/visitors/${visitor.id}/checkout`);
      if (response.data.success) {
        toast({
          title: "Berhasil",
          description: "Check-out berhasil",
        });
        fetchVisitors();
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Gagal melakukan check-out",
        variant: "destructive",
      });
    }
  }
};

// Theme
const toggleTheme = () => {
  const html = document.documentElement;
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
};

// Guest Form
const guestForm = reactive({
  nama: "",
  instansi: "",
  telepon: "",
  email: "",
  tujuan_staf: "",
  keperluan: "",
});

const submitGuest = async () => {
  isSubmittingGuest.value = true;
  try {
    const response = await api.post("/visitors", {
      name: guestForm.nama,
      phone: guestForm.telepon,
      purpose: guestForm.keperluan,
      host_name: guestForm.tujuan_staf,
      institution: guestForm.instansi,
    });

    if (response.data.success) {
      toast({
        title: "Berhasil!",
        description: "Kunjungan berhasil didaftarkan.",
      });
      // Reset Form
      Object.keys(guestForm).forEach((key) => (guestForm[key] = ""));
      // Refresh list
      fetchVisitors();
    }
  } catch (error) {
    console.error("Error submitting guest:", error);
    toast({
      title: "Gagal",
      description: error.response?.data?.message || "Gagal mendaftarkan kunjungan",
      variant: "destructive",
    });
  } finally {
    isSubmittingGuest.value = false;
  }
};

// Feedback Form
const feedbackForm = reactive({
  nama: "",
  email: "",
  instansi: "",
  rating: 0,
  pesan: "",
});
const hoverRating = ref(0);
const ratingLabels = [
  "Pilih Bintang",
  "Sangat Buruk",
  "Buruk",
  "Biasa Saja",
  "Sangat Baik",
  "Luar Biasa!",
];
const ratingLabel = computed(
  () => ratingLabels[hoverRating.value || feedbackForm.rating]
);

const setRating = (val) => {
  feedbackForm.rating = val;
};

const submitFeedback = async () => {
  isSubmittingFeedback.value = true;
  try {
    const response = await api.post("/feedback", {
      name: feedbackForm.nama,
      institution: feedbackForm.instansi,
      comment: feedbackForm.pesan,
      rating: feedbackForm.rating,
    });

    if (response.data.success) {
      toast({
        title: "Feedback Terkirim",
        description: "Terima kasih atas masukan Anda.",
      });
      // Reset Form
      Object.keys(feedbackForm).forEach(
        (key) => (feedbackForm[key] = key === "rating" ? 0 : "")
      );
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    toast({
      title: "Gagal",
      description: error.response?.data?.message || "Gagal mengirim feedback",
      variant: "destructive",
    });
  } finally {
    isSubmittingFeedback.value = false;
  }
};

const handleLogout = async () => {
  const result = await swal.confirm(
    "Apakah Anda yakin ingin keluar?",
    "Sesi Anda akan berakhir."
  );
  if (result.isConfirmed) {
    await auth.logout();
    router.push("/login");
  }
};

// Styles Injection
onMounted(() => {
  loadTailwind();

  // Fetch data
  fetchVisitors();

  // Initial theme check
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

const loadTailwind = () => {
  // Load Tailwind CSS
  if (!document.getElementById("tailwind-cdn")) {
    const script = document.createElement("script");
    script.id = "tailwind-cdn";
    script.src = "https://cdn.tailwindcss.com?plugins=forms,container-queries";
    script.onload = () => {
      window.tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: {
                50: "#f5f7ff",
                100: "#ebf0fe",
                200: "#dae3fd",
                300: "#c0cdfb",
                400: "#9baaf7",
                500: "#6366f1",
                600: "#4f46e5",
                700: "#4338ca",
                800: "#3730a3",
                900: "#312e81",
              },
              background: { light: "#f8fafc", dark: "#0f172a" },
              surface: { light: "#ffffff", dark: "#1e293b" },
            },
            fontFamily: {
              display: ["Outfit", "sans-serif"],
              body: ["Plus Jakarta Sans", "sans-serif"],
            },
            boxShadow: {
              glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
              "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            },
          },
        },
      };
    };
    document.head.appendChild(script);
  }

  // Remove Hope UI styles if they exist from previous navigation
  [
    "hope-ui-core",
    "hope-ui-main",
    "hope-ui-custom",
    "hope-ui-dark",
    "hope-ui-rtl",
    "hope-ui-customizer",
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
};
</script>

<style>
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.dark .glass-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.star-rating button {
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.star-rating button:hover {
  transform: scale(1.2);
}

.star-active {
  color: #fbbf24 !important;
  font-variation-settings: "FILL" 1;
}
</style>
