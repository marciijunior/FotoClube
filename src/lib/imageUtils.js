/**
 * Normaliza a URL da imagem para funcionar tanto em dev quanto em produção.
 * Converte URLs localhost e paths relativos para a URL do servidor de uploads.
 */
export function normalizeImage(img) {
  if (!img) return null;
  if (
    img.startsWith("http://localhost") ||
    img.startsWith("https://localhost")
  ) {
    const filename = img.split("/").pop();
    return `${import.meta.env.VITE_UPLOADS_URL}/${filename}`;
  }
  if (img.startsWith("http")) return img;
  return `${import.meta.env.VITE_UPLOADS_URL}/${img}`;
}

/**
 * Faz upload autenticado de uma imagem para o backend.
 * Envia o token Bearer do localStorage junto com a requisição.
 * @param {File} file - O arquivo a ser enviado
 * @returns {Promise<{url: string, filename: string}>}
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token");
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${import.meta.env.VITE_UPLOADS_URL.replace(/\/uploads$/, "")}/upload`,
    {
      method: "POST",
      headers,
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao fazer upload da imagem");
  }

  return await response.json();
}
