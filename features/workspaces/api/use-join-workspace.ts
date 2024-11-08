import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<
   (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"]
>;
type ResponseType = InferResponseType<
   (typeof client.api.workspaces)[":workspaceId"]["join"]["$post"],
   200
>;

export const useJoinWorkspace = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ param, json }) => {
         const response = await client.api.workspaces[":workspaceId"]["join"]["$post"]({
            param,
            json,
         });

         if (!response.ok) throw new Error("Faild to join workspace");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("joined workspace");
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
         queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
      },
      onError: () => {
         toast.error("Faild to join workspace");
      },
   });

   return mutation;
};
