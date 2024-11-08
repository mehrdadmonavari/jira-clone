import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.members)[":memberId"]["$delete"]>;
type ResponseType = InferResponseType<
   (typeof client.api.members)[":memberId"]["$delete"],
   200
>;

export const useDeleteMember = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ param }) => {
         const response = await client.api.members[":memberId"]["$delete"]({
            param,
         });

         if (!response.ok) throw new Error("Faild to delete member");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Member deleted");
         queryClient.invalidateQueries({ queryKey: ["members"] });
      },
      onError: () => {
         toast.error("Faild to delete member");
      },
   });

   return mutation;
};
