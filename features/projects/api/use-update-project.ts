import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/rpc";

type RequerstType = InferRequestType<
   (typeof client.api.projects)[":projectId"]["$patch"]
>;
type ResponseType = InferResponseType<
   (typeof client.api.projects)[":projectId"]["$patch"],
   200
>;

export const useUpdateProject = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ form, param }) => {
         const response = await client.api.projects[":projectId"]["$patch"]({
            form,
            param,
         });

         if (!response.ok) throw new Error("Faild to update project");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("Project updated");
         queryClient.invalidateQueries({ queryKey: ["projects"] });
         queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
      },
      onError: () => {
         toast.error("Faild to update projects");
      },
   });

   return mutation;
};
