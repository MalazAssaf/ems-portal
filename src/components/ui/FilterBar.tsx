import { Dropdown } from "./Dropdown";

type FilterField =
  | {
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
    }
  | {
      type: "date" | "number" | "text" | "input";
      name: string;
      label: string;
      placeholder?: string;
      min?: number;
      max?: number;
      step?: number;
    };

type FilterBarProps = {
  filters: Record<string, string>;
  fields: FilterField[];
  onChange: (name: string, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
};

export function FilterBar({
  filters,
  fields,
  onChange,
  onSearch,
  onReset,
}: FilterBarProps) {
  return (
    <div
      className="flex flex-col gap-3 p-4 mb-4 rounded-2xl"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex justify-center flex-row flex-wrap items-end gap-3">
        {fields.map((field) => {
          const commonProps = {
            name: field.name,
            value: filters[field.name] ?? "",
            className: "w-fit px-3 py-2 text-sm border outline-none",
            style: {
              borderColor: "var(--color-border)",
              borderRadius: "8px",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-ink)",
              height: "38px",
            },
          };

          return (
            <div key={field.name} className="flex flex-col gap-1">
              <label
                className="text-xs font-medium capitalize"
                style={{ color: "var(--color-ink-secondary)" }}
              >
                {field.label}
              </label>
              {field.type === "select" ? (
                <Dropdown
                  value={filters[field.name] ?? ""}
                  placeholder={`Select ${field.label}`}
                  options={field.options}
                  onChange={(val) => onChange(field.name, val)}
                />
              ) : (
                <input
                  {...commonProps}
                  type={field.type === "input" ? "text" : field.type}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  placeholder={
                    field.type !== "date" && field.type !== "number"
                      ? (field.placeholder ?? `Search by ${field.label}...`)
                      : undefined
                  }
                  {...(field.type === "number" && {
                    min: field.min,
                    max: field.max,
                    step: field.step ?? "any",
                  })}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={onSearch}
          style={{
            height: "38px",
            padding: "0 20px",
            borderRadius: "8px",
            border: "none",
            background: "var(--color-primary)",
            color: "white",
            fontSize: "13px",
            fontWeight: 500,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Search
        </button>

        <button
          onClick={onReset}
          style={{
            height: "38px",
            padding: "0 16px",
            borderRadius: "8px",
            border: "1px solid var(--color-border)",
            background: "transparent",
            color: "var(--color-ink-secondary)",
            fontSize: "13px",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
