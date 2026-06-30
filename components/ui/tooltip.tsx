import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ",
  {
    variants: {
      color: {
        secondary: "border bg-secondary text-white border-secondary [--arrow-fill:var(--color-secondary)]",
        primary: "border border-primary bg-primary text-primary-foreground [--arrow-fill:var(--color-primary)]",
        warning: "border border-warning bg-warning text-warning-foreground [--arrow-fill:var(--color-warning)]",
        info: "border border-info bg-info text-info-foreground [--arrow-fill:var(--color-info)]",
        success: "border border-success bg-success text-success-foreground [--arrow-fill:var(--color-success)]",
        destructive:
          "border border-destructive bg-destructive text-destructive-foreground [--arrow-fill:var(--color-destructive)]",
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

interface TolTipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, VariantProps<typeof tooltipVariants> {
  color?: 'primary' | 'secondary' | 'warning' | 'info' | 'success' | 'destructive'
  children?: React.ReactNode;

}


const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider {...props} delayDuration={delayDuration} />
);

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    fill="var(--arrow-fill, currentColor)"
    className={cn(className)}
    {...props}
  />
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;


const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TolTipProps
>(
  ({ className, sideOffset = 4, color, children, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipVariants({ color }), className, {})}
      {...props}
    >
      {children}
    </TooltipPrimitive.Content>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
};
