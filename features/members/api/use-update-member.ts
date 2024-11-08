import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.members)[":memberId"]["$patch"]>;
type ResponseType = InferResponseType<
   (typeof client.api.members)[":memberId"]["$patch"],
   200
>;

export const useUpdateMember = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ param, json }) => {
         const response = await client.api.members[":memberId"]["$patch"]({
            param,
            json,
         });

         if (!response.ok) throw new Error("Faild to update member");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Member updated");
         queryClient.invalidateQueries({ queryKey: ["members"] });
      },
      onError: () => {
         toast.error("Faild to update member");
      },
   });

   return mutation;
};
