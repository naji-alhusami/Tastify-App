import axios from "axios";

interface NominatimResponse {
  display_name: string;
}

export const getAddress = async (
  lat: number,
  lon: number
): Promise<string | null> => {
  try {
    const response = await axios.get<NominatimResponse>(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );

    const address = response.data.display_name;
    return address || null;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};
