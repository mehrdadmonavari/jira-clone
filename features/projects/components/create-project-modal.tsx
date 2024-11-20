"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import React from "react";
import { CreateProjectForm } from "./create-project-form";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";

interface CreateProjectModalProps {}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({}) => {
   const { isOpen, close, setIsOpen } = useCreateProjectModal();

   return (
      <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
         <CreateProjectForm onCancle={close} />
      </ResponsiveModal>
   );
};