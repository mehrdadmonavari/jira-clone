import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<
   (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>;
type ResponseType = InferResponseType<
   (typeof client.api.workspaces)[":workspaceId"]["$patch"],
   200
>;

export const useUpdateWorkspace = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ form, param }) => {
         const response = await client.api.workspaces[":workspaceId"]["$patch"]({
            form,
            param,
         });

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
