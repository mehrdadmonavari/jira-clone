import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<
   (typeof client.api.projects)[":projectId"]["$delete"]
>;
type ResponseType = InferResponseType<
   (typeof client.api.projects)[":projectId"]["$delete"],
   200
>;

export const useDeleteProject = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ param }) => {
         const response = await client.api.projects[":projectId"]["$delete"]({
            param,
         });

         if (!response.ok) throw new Error("Faild to delete project");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("Project deleted");
         router.refresh();
         queryClient.invalidateQueries({ queryKey: ["projects"] });
         queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
      },
      onError: () => {
         toast.error("Faild to delete projects");
      },
   });

   return mutation;
};
