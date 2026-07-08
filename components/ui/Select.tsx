"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  name: string;
  options: Array<SelectOption | string>;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Classes for the trigger button (typically the shared field style). */
  className?: string;
  /** id of an external <label> describing the control. */
  labelledBy?: string;
  /** id of an external error message describing the control. */
  describedBy?: string;
  /** Marks the control invalid (red ring + aria-invalid). */
  invalid?: boolean;
  onValueChange?: (value: string) => void;
}

function normalize(options: Array<SelectOption | string>): SelectOption[] {
  return options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
}

/**
 * Accessible select-only combobox (WAI-ARIA APG pattern): a styled trigger and
 * an animated listbox popover, with full keyboard support (arrows, Home/End,
 * type-ahead, Enter/Escape) and type-to-search. Submits its value through a
 * hidden input so it works inside a plain <form> / FormData.
 */
export function Select({
  id,
  name,
  options,
  defaultValue = "",
  placeholder = "Select an option",
  required,
  disabled,
  className,
  labelledBy,
  describedBy,
  invalid,
  onValueChange,
}: SelectProps) {
  const items = normalize(options);
  const reduce = useReducedMotion();
  const reactId = useId();
  const listId = `${reactId}-listbox`;
  const optionId = (i: number) => `${reactId}-opt-${i}`;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [active, setActive] = useState(() => {
    const i = items.findIndex((o) => o.value === defaultValue);
    return i >= 0 ? i : 0;
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef<{ query: string; timer: number | null }>({ query: "", timer: null });

  const selected = items.find((o) => o.value === value) ?? null;

  function commit(index: number) {
    const opt = items[index];
    if (!opt) return;
    setValue(opt.value);
    onValueChange?.(opt.value);
    close();
  }

  function openList(toIndex?: number) {
    if (disabled) return;
    setActive(toIndex ?? (selected ? items.findIndex((o) => o.value === selected.value) : 0));
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  // Close on outside pointer.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the active option scrolled into view while navigating.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const node = listRef.current.querySelector<HTMLElement>(`#${CSS.escape(optionId(active))}`);
    node?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, active]);

  function runTypeahead(key: string) {
    const t = typeahead.current;
    if (t.timer) window.clearTimeout(t.timer);
    t.query += key.toLowerCase();
    const start = t.query.length === 1 ? active + 1 : active;
    const n = items.length;
    for (let step = 0; step < n; step += 1) {
      const i = (start + step) % n;
      if (items[i].label.toLowerCase().startsWith(t.query)) {
        setActive(i);
        if (!open) openList(i);
        break;
      }
    }
    t.timer = window.setTimeout(() => {
      t.query = "";
    }, 500);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openList();
        else setActive((a) => Math.min(a + 1, items.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openList();
        else setActive((a) => Math.max(a - 1, 0));
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(items.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          close();
        }
        break;
      case "Tab":
        if (open) close();
        break;
      default:
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault();
          runTypeahead(e.key);
        }
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        aria-required={required}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 text-left",
          className,
          invalid && "!border-[color:var(--color-danger)] focus:!shadow-[0_0_0_4px_rgba(220,38,38,0.12)]",
        )}
      >
        <span className={cn("truncate", selected ? "text-ink" : "text-muted")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          aria-hidden
          className={cn(
            "shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180 text-primary",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={placeholder}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 max-h-64 overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-[0_1px_2px_rgba(26,20,38,0.04),0_20px_44px_-16px_rgba(126,73,242,0.32)]"
          >
            {items.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === active;
              return (
                <li
                  key={opt.value}
                  id={optionId(i)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(i)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-body transition-colors",
                    isActive ? "bg-[color:var(--blue-50)] text-ink" : "text-secondary",
                    isSelected && "font-semibold text-ink",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected ? (
                    <Check size={16} aria-hidden className="shrink-0 text-primary" />
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
