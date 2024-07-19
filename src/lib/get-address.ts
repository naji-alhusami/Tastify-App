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

export const extractAddressDetails = (
  address: string | null
): addressDetails | undefined => {
  if (address) {
    const addressParts = address.split(",");

    // Ensure that the address has enough parts to extract details
    if (addressParts.length >= 6) {
      const street = addressParts[1].trim();
      const city = addressParts[3].trim();
      const state = addressParts[4].trim();
      const zipCode = addressParts[5].trim();
      return { street, city, state, zipCode };
    } else {
      console.error("Address format is not as expected:", address);
      return undefined;
    }
  }}
