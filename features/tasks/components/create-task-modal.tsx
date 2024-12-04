"use client"

import React from "react";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

interface CreateTaskModalProps {}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = () => {
   const { isOpen, setIsOpen } = useCreateTaskModal();

   return (
      <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
         <div>
            <CreateTaskFormWrapper onCancel={() => setIsOpen(false)} />
         </div>
      </ResponsiveModal>
   );
};
