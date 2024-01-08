import { useQuery } from "@tanstack/react-query";
import config from "../constants";

export function useLifiConnections() {
  const { data } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      return fetch(
        `https://li.quest/v1/connections?toChain=${config.TARGET_CHAIN}&toToken=${config.TARGET_TOKEN}&options`,
        options
      ).then((response) => response.json());
    },
  });

  return data;
}
