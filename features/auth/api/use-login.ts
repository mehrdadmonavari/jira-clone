import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type RequerstType = InferRequestType<(typeof client.api.auth.login)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.auth.login["$post"]({ json });
         return await response.json();
      },
      onSuccess: () => {
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["current"] });
      },
   });

   return mutation;
};
