import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
   return (
      <div className="flex justify-center items-center">
         <Button>default</Button>
         <Button variant="secondary">secondary</Button>
         <Button variant="destructive">destructive</Button>
         <Button variant="ghost">ghost</Button>
         <Button variant="muted">link</Button>
         <Button variant="outline">outline</Button>
         <Button variant="teritary">outline</Button>
      </div>
   );
}
