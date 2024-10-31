import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.auth.login)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.auth.login["$post"]({ json });

         if (!response.ok) throw new Error("Faild to login");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Logged in");
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["current"] });
      },
      onError: () => {
         toast.error("Faild to log in");
      },
   });

   return mutation;
};
