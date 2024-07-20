interface addressDetails {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export const ExtractAddressDetails = (
  address: string | null
): addressDetails | undefined => {
  if (address) {
    const addressParts = address.split(",");

    if (addressParts.length >= 6) {
      const street = addressParts[1].trim();
      const city = addressParts[3].trim();
      const state = addressParts[4].trim();
      const zipCode = addressParts[5].trim();
      return { street, city, state, zipCode };
    } else {
      return undefined;
    }
  }
};
