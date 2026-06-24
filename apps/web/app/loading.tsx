import { LoaderIcon } from "lucide-react";
import { cn } from "~/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}
function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
}
export default Loading;
