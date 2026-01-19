import Swal from "sweetalert2";

const swal = {
  success: (title, text) => {
    return Swal.fire({
      icon: "success",
      title: title || "Berhasil!",
      text: text,
      confirmButtonColor: "#10b981", // emerald-500
    });
  },
  error: (title, text) => {
    return Swal.fire({
      icon: "error",
      title: title || "Gagal!",
      text: text,
      confirmButtonColor: "#ef4444", // red-500
    });
  },
  warning: (title, text) => {
    return Swal.fire({
      icon: "warning",
      title: title || "Peringatan!",
      text: text,
      confirmButtonColor: "#f59e0b", // amber-500
    });
  },
  confirm: (title, text, confirmText = "Ya, Lanjut!") => {
    return Swal.fire({
      title: title || "Apakah Anda yakin?",
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f172a", // slate-900
      cancelButtonColor: "#64748b", // slate-500
      confirmButtonText: confirmText,
      cancelButtonText: "Batal",
    });
  },
};

export default swal;
