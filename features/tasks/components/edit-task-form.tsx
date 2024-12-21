"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTaskSchema } from "../schemas";
import { cn } from "@/lib/utils";
import { DottedSeparator } from "@/components/dotted-separator";
import { DatePicker } from "@/components/date-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Task, TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useUpdateTask } from "../api/use-update-task";

interface EditTaskFormProps {
   onCancle?: () => void;
   projectOptions: { id: string; name: string; imageUrl: string }[];
   memberOptions: { id: string; name: string }[];
   initialValues: Task;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({
   onCancle,
   projectOptions,
   memberOptions,
   initialValues,
}) => {
   const workspaceId = useWorkspaceId();
   const { mutate, isPending } = useUpdateTask();

   const form = useForm<z.infer<typeof createTaskSchema>>({
      resolver: zodResolver(
         createTaskSchema.omit({ workspaceId: true, description: true })
      ),
      defaultValues: {
         ...initialValues,
         dueDate: initialValues.dueDate ? new Date(initialValues.dueDate) : undefined,
      },
   });

   const onSubmit = (values: z.infer<typeof createTaskSchema>) => {
      mutate(
         { json: values, param: { taskId: initialValues.$id } },
         {
            onSuccess: () => {
               form.reset();
               onCancle?.();
            },
         }
      );
   };

   return (
      <Card className="w-full h-full border-none shadow-none">
         <CardHeader className="flex p-7">
            <CardTitle className="text-xl fonr-bold">Edit a task</CardTitle>
         </CardHeader>
         <div className="px-7 mb-7">
            <DottedSeparator />
         </div>
         <CardContent className="px-7">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-y-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Task Name</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Enter task name" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Due Date</FormLabel>
                              <FormControl>
                                 <DatePicker {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="assigneeId"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Assignee</FormLabel>
                              <Select
                                 defaultValue={field.value}
                                 onValueChange={field.onChange}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select assignee" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <FormMessage />
                                 <SelectContent>
                                    {memberOptions.map((member) => (
                                       <SelectItem key={member.id} value={member.id}>
                                          <div className="flex items-center gap-x-2">
                                             <MemberAvatar
                                                name={member.name}
                                                className="size-6"
                                             />
                                             {member.name}
                                          </div>
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select
                                 defaultValue={field.value}
                                 onValueChange={field.onChange}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <FormMessage />
                                 <SelectContent>
                                    <SelectItem value={TaskStatus.BACKLOG}>
                                       Backlog
                                    </SelectItem>
                                    <SelectItem value={TaskStatus.IN_PROGRESS}>
                                       In Progress
                                    </SelectItem>
                                    <SelectItem value={TaskStatus.IN_REVIEW}>
                                       In Review
                                    </SelectItem>
                                    <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                                    <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="projectId"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Project</FormLabel>
                              <Select
                                 defaultValue={field.value}
                                 onValueChange={field.onChange}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select project" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <FormMessage />
                                 <SelectContent>
                                    {projectOptions.map((project) => (
                                       <SelectItem key={project.id} value={project.id}>
                                          <div className="flex items-center gap-x-2">
                                             <ProjectAvatar
                                                name={project.name}
                                                image={project.imageUrl}
                                                className="size-6"
                                             />
                                             {project.name}
                                          </div>
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </FormItem>
                        )}
                     />
                  </div>
                  <DottedSeparator className="py-7" />
                  <div className="flex justify-between items-center">
                     <Button
                        onClick={onCancle}
                        disabled={isPending}
                        className={cn(!onCancle && "invisible")}
                        type="button"
                        variant="secondary"
                        size="lg">
                        Cancle
                     </Button>
                     <Button
                        disabled={isPending}
                        type="submit"
                        variant="primary"
                        size="lg">
                        Save Changes
                     </Button>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
