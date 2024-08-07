import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { GetAddress } from "../../lib/GetAddress";

const useAddressCoords = () => {
  const [address, setAddress] = useState<string | null>("");
  const [params] = useSearchParams();

  const latString = params.get("lat");
  const lonString = params.get("lng");

  const lata = latString ? parseFloat(latString) : null;
  const lona = lonString ? parseFloat(lonString) : null;

  useEffect(() => {
    const fetchAddress = async () => {
      if (lata !== null && lona !== null) {
        const fetchedAddress = await GetAddress(lata, lona);
        setAddress(fetchedAddress);
      }
    };

    fetchAddress();
  }, [lata, lona]);

  return { address };
};

export default useAddressCoords;
