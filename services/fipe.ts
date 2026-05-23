import { api } from "./api";

export async function getBrands() {
  const response = await api.get(
    "/carros/marcas"
  );

  return response.data;
}
export async function getModels(
  brandId: string
) {
  const response = await api.get(
    `/carros/marcas/${brandId}/modelos`
  );

  return response.data.modelos;
}