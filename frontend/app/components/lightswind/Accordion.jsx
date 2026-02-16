import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";

// --- Contexts ---
const AccordionContext = React.createContext(undefined);
const AccordionItemContext = React.createContext(undefined);

// --- Accordion Component ---
const Accordion = React.forwardRef(
  (
    {
      className,
      type = "single",
      value,
      defaultValue = [],
      onValueChange,
      collapsible = true,
      children,
      ...props
    },
    ref
  ) => {
    const normalizeValue = (val) => {
      if (Array.isArray(val)) return val;
      return val ? [val] : [];
    };

    const initialValues = normalizeValue(
      value !== undefined ? value : defaultValue
    );

    const [values, setValues] = React.useState(
      type === "single" && initialValues.length > 1
        ? [initialValues[0]]
        : initialValues
    );

    React.useEffect(() => {
      if (value !== undefined) {
        const newValues = normalizeValue(value);
        setValues(
          type === "single" && newValues.length > 1
            ? [newValues[0]]
            : newValues
        );
      }
    }, [value, type]);

    const handleValueChange = React.useCallback(
      (itemValue) => {
        const isCurrentlyOpen = values.includes(itemValue);
        let newValues = [];

        if (type === "single") {
          if (isCurrentlyOpen) {
            newValues = collapsible ? [] : [itemValue];
          } else {
            newValues = [itemValue];
          }
        } else {
          newValues = isCurrentlyOpen
            ? values.filter((v) => v !== itemValue)
            : [...values, itemValue];
        }

        if (value === undefined) {
          setValues(newValues);
        }

        if (onValueChange) {
          onValueChange(newValues);
        }
      },
      [values, onValueChange, value, type, collapsible]
    );

    return (
      <AccordionContext.Provider
        value={{ value: values, onValueChange: handleValueChange, type, collapsible }}
      >
        <div ref={ref} className={cn(className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

// --- AccordionItem ---
const AccordionItem = React.forwardRef(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn(
            "border-b border-muted-foreground/20 text-black dark:text-white",
            className
          )}
          data-state={disabled ? "disabled" : undefined}
          data-value={value}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

// --- AccordionTrigger ---
const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context)
      throw new Error("AccordionTrigger must be used within an Accordion");

    const itemContext = React.useContext(AccordionItemContext);
    if (!itemContext)
      throw new Error("AccordionTrigger must be used within an AccordionItem");

    const { value: values, onValueChange } = context;
    const { value: itemValue } = itemContext;

    const isOpen = values.includes(itemValue);

    const handleToggle = () => {
      onValueChange(itemValue);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
          className
        )}
        onClick={handleToggle}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}

        <div className="relative h-4 w-4 lg:h-6 lg:w-6 ml-2 shrink-0">
          <Plus
            className={cn(
              "h-4 w-4 lg:h-6 lg:w-6 absolute transition-all duration-300 ease-in-out",
              isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
            )}
          />
          <Minus
            className={cn(
              "h-4 w-4 lg:h-6 lg:w-6 absolute transition-all duration-300 ease-in-out",
              isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
            )}
          />
        </div>
      </button>
    );
  }
);

AccordionTrigger.displayName = "AccordionTrigger";

// --- AccordionContent ---
const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context)
      throw new Error("AccordionContent must be used within an Accordion");

    const itemContext = React.useContext(AccordionItemContext);
    if (!itemContext)
      throw new Error("AccordionContent must be used within an AccordionItem");

    const { value: values } = context;
    const { value: itemValue } = itemContext;

    const isOpen = values.includes(itemValue);

    const contentRef = React.useRef(null);
    const [contentHeight, setContentHeight] = React.useState(0);

    React.useLayoutEffect(() => {
      if (isOpen && contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(0);
      }
    }, [isOpen, children]);

    return (
      <div
        ref={ref}
        style={{
          height: isOpen ? `${contentHeight}px` : "0px",
          transition: "height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="overflow-hidden"
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <div ref={contentRef} className={cn("pb-4 pt-0 text-sm", className)}>
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
