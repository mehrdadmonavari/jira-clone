"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import React from "react";
import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

interface CreateWorkspaceModalProps {}

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({}) => {
   const { isOpen, close, setIsOpen } = useCreateWorkspaceModal();

   return (
      <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
         <CreateWorkspaceForm onCancle={close} />
      </ResponsiveModal>
   );
};
