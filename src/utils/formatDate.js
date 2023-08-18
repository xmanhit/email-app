export default function formatDate(dateString, local = "vi-VN", hour, options) {
  return hour
    ? new Date(dateString).toLocaleString(local, options)
    : new Date(dateString).toLocaleDateString(local, options);
}
