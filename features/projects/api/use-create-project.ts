import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.projects)["$post"]>;
type ResponseType = InferResponseType<(typeof client.api.projects)["$post"], 200>;

export const useCreateProject = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ form }) => {
         const response = await client.api.projects["$post"]({ form });

         if (!response.ok) throw new Error("Faild to create project");

         return await response.json();
      },
      onSuccess: () => {
         toast.success("Project created");
         queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: () => {
         toast.error("Faild to create project");
      },
   });

   return mutation;
};
