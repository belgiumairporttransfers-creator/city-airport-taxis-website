"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * A simplified Accordion component that doesn't depend on Radix UI,
 * ensuring it works even if the dependency is not installed.
 */

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string
}

const AccordionContext = React.createContext<{
  value: string | string[]
  setValue: React.Dispatch<React.SetStateAction<string | string[]>>
  type: "single" | "multiple"
  collapsible: boolean
} | null>(null)

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", collapsible = false, defaultValue = "", className, children, ...props }, ref) => {
    const [value, setValue] = React.useState<string | string[]>(
      type === "multiple" ? (defaultValue ? [defaultValue] : []) : defaultValue
    )

    return (
      <AccordionContext.Provider value={{ value, setValue, type, collapsible }}>
        <div ref={ref} className={cn("space-y-1", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItemContext = React.createContext<{ value: string } | null>(null)

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, ...props }, ref) => {
    const context = React.useContext(AccordionContext)
    if (!context) throw new Error("AccordionItem must be used within Accordion")

    const isOpen = context.type === "multiple" 
      ? (context.value as string[]).includes(value)
      : context.value === value

    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn("border-b", className)}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        />
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)

  if (!context || !itemContext) throw new Error("AccordionTrigger must be used within AccordionItem")

  const isOpen = context.type === "multiple" 
    ? (context.value as string[]).includes(itemContext.value)
    : context.value === itemContext.value

  const onClick = () => {
    if (context.type === "multiple") {
      const curValue = context.value as string[]
      if (curValue.includes(itemContext.value)) {
        context.setValue(curValue.filter(v => v !== itemContext.value))
      } else {
        context.setValue([...curValue, itemContext.value])
      }
    } else {
      if (context.value === itemContext.value) {
        if (context.collapsible) context.setValue("")
      } else {
        context.setValue(itemContext.value)
      }
    }
  }

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          "flex flex-1 items-center justify-between font-medium transition-all group outline-none",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <div className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ml-4",
          isOpen ? "bg-secondary text-white rotate-180" : "bg-gray-100 text-gray-400 group-hover:bg-secondary/10 group-hover:text-secondary"
        )}>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </div>
      </button>
    </div>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)

  if (!context || !itemContext) throw new Error("AccordionContent must be used within AccordionItem")

  const isOpen = context.type === "multiple" 
    ? (context.value as string[]).includes(itemContext.value)
    : context.value === itemContext.value

  return (
    <div
      ref={ref}
      className={cn(
        "grid transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="min-h-0">
        <div className="pb-4 pt-0">{children}</div>
      </div>
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
