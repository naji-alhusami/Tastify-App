import axios from "axios";

interface NominatimResponse {
  display_name: string;
}

interface addressDetails {
  street: string;
  city: string;
  state: string;
  zipCode: string;
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

export const extractAddressDetails = (address: string): addressDetails => {
  const addressDetails = address.split(",");

  const street = addressDetails[1].trim();
  const city = addressDetails[3].trim();
  const state = addressDetails[4].trim();
  const zipCode = addressDetails[5].trim();

  return { street, city, state, zipCode };
};
