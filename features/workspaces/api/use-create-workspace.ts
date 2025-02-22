import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.workspaces)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ form }) => {
         const response = await client.api.workspaces["$post"]({ form });

         if (!response.ok) throw new Error("Faild to create workspace");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Workspace created");
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      },
      onError: () => {
         toast.error("Faild to create workspace");
      },
   });

   return mutation;
};
