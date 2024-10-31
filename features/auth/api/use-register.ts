import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.auth.register)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.auth.register["$post"]({ json });

         if (!response.ok) throw new Error("Faild to register");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Registered");
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["current"] });
      },
      onError: () => {
         toast.error("Faild to Register");
      },
   });

   return mutation;
};
