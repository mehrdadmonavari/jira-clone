"use client";

import React from "react";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

interface EditTaskModalProps {}

export const EditTaskModal: React.FC<EditTaskModalProps> = () => {
   const { taskId, close } = useEditTaskModal();

   return (
      <ResponsiveModal open={!!taskId} onOpenChange={close}>
         {taskId && <EditTaskFormWrapper id={taskId} onCancel={close} />}
      </ResponsiveModal>
   );
};
