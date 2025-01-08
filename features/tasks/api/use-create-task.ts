import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.tasks)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.tasks)["$post"], 200>;

export const useCreateTask = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.tasks["$post"]({ json });

         if (!response.ok) throw new Error("Faild to create task");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("task created");
         queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
         queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: () => {
         toast.error("Faild to create task");
      },
   });

   return mutation;
};
