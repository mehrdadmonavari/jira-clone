import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<
   (typeof client.api.workspaces)[":workspaceId"]["$delete"]
>;
type ResponseType = InferResponseType<
   (typeof client.api.workspaces)[":workspaceId"]["$delete"],
   200
>;

export const useDeleteWorkspace = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ param }) => {
         const response = await client.api.workspaces[":workspaceId"]["$delete"]({
            param,
         });

         if (!response.ok) throw new Error("Faild to delete workspace");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("Workspace deleted");
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
      },
      onError: () => {
         toast.error("Faild to delete workspace");
      },
   });

   return mutation;
};
