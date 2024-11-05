import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.workspaces)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"], 200>;

export const useCreateWorkspace = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ form }) => {
         const response = await client.api.workspaces["$post"]({ form });

         if (!response.ok) throw new Error("Faild to update workspace");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("Workspace updated");
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
      },
      onError: () => {
         toast.error("Faild to update workspace");
      },
   });

   return mutation;
};
