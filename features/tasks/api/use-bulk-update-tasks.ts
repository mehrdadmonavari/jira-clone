import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.tasks)["bulk-update"]["$post"]>;
type ResponseType = InferResponseType<
   (typeof client.api.tasks)["bulk-update"]["$post"],
   200
>;

export const useBulkUpdateTasks = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json }) => {
         const response = await client.api.tasks["bulk-update"]["$post"]({ json });

         if (!response.ok) throw new Error("Faild to update tasks");

         return await response.json();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
         queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
         toast.success("tasks updated");
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: () => {
         toast.error("Faild to update tasks");
      },
   });

   return mutation;
};
