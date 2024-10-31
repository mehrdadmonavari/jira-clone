import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type RequerstType = InferRequestType<(typeof client.api.workspaces)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspaces = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.workspaces["$post"]({ json });
         return await response.json();
      },
      onSuccess: () => {
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      },
   });

   return mutation;
};
