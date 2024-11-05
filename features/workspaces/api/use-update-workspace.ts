import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<
   (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>;
type ResponseType = InferResponseType<
   (typeof client.api.workspaces)[":workspaceId"]["$patch"]
>;

export const useUpdateWorkspace = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ form, param }) => {
         const response = await client.api.workspaces[":workspaceId"]["$patch"]({
            form,
            param,
         });

         if (!response.ok) throw new Error("Faild to create workspace");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Workspace created");
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      },
      onError: () => {
         toast.error("Faild to create workspace");
      },
   });

   return mutation;
};
