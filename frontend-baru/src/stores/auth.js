import { reactive, computed } from "vue";
import api from "@/services/api";

// State reaktif untuk autentikasi
const state = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("auth_token") || null,
  loading: false,
  error: null,
});

// Computed: Cek apakah user sudah login
const isAuthenticated = computed(() => !!state.token);

// Computed: Dapatkan user saat ini
const currentUser = computed(() => state.user);

// Computed: Dapatkan role user
const userRole = computed(() => state.user?.role || null);

// Action: Login
const login = async (email, password) => {
  state.loading = true;
  state.error = null;

  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.data.success) {
      const { access_token, user } = response.data.data;

      // Simpan ke state
      state.token = access_token;
      state.user = user;

      // Simpan ke localStorage
      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      state.loading = false;
      return { success: true, user };
    }
  } catch (error) {
    state.loading = false;
    state.error = error.response?.data?.message || "Login gagal";
    return { success: false, error: state.error };
  }
};

// Action: Logout
const logout = async () => {
  state.loading = true;

  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Hapus dari state
    state.token = null;
    state.user = null;
    state.loading = false;

    // Hapus dari localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }
};

// Action: Get current user profile
const fetchUser = async () => {
  if (!state.token) return null;

  try {
    const response = await api.get("/auth/me");
    if (response.data.success) {
      state.user = response.data.data;
      localStorage.setItem("user", JSON.stringify(state.user));
      return state.user;
    }
  } catch (error) {
    console.error("Fetch user error:", error);
    // Jika 401, interceptor akan handle redirect
    return null;
  }
};

// Action: Update profile
const updateProfile = async (data) => {
  state.loading = true;
  state.error = null;

  try {
    const response = await api.put("/auth/profile", data);
    if (response.data.success) {
      state.user = { ...state.user, ...data };
      localStorage.setItem("user", JSON.stringify(state.user));
      state.loading = false;
      return { success: true };
    }
  } catch (error) {
    state.loading = false;
    state.error = error.response?.data?.message || "Update gagal";
    return { success: false, error: state.error };
  }
};

// Action: Change password
const changePassword = async (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  state.loading = true;
  state.error = null;

  try {
    const response = await api.post("/auth/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    });

    state.loading = false;
    if (response.data.success) {
      return { success: true, message: response.data.message };
    }
  } catch (error) {
    state.loading = false;
    state.error = error.response?.data?.message || "Ganti password gagal";
    return { success: false, error: state.error };
  }
};

// Action: Upload avatar
const uploadAvatar = async (file) => {
  state.loading = true;
  state.error = null;

  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/auth/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      state.user = { ...state.user, avatar_url: response.data.data.avatar_url };
      localStorage.setItem("user", JSON.stringify(state.user));
      state.loading = false;
      return { success: true, avatar_url: response.data.data.avatar_url };
    }
  } catch (error) {
    state.loading = false;
    state.error = error.response?.data?.message || "Upload avatar gagal";
    return { success: false, error: state.error };
  }
};

// Export auth store
export const useAuthStore = () => ({
  // State
  state,
  isAuthenticated,
  currentUser,
  userRole,

  // Actions
  login,
  logout,
  fetchUser,
  updateProfile,
  changePassword,
  uploadAvatar,
});
