import React from "react";

const SchemaRow = ({
  index,
  value,
  label,
  type,
  options,
  onChange,
  onRemove,
}) => {
  // find the type for current value (if options includes it)
  const currentType =
    options.find((o) => o.value === value)?.type || type || "user";
  const dotClass = currentType === "group" ? "bg-red-500" : "bg-green-500";

  return (
    <div className="flex items-center gap-3 mb-3">
      {/* colored dot */}
      <span className={`w-3 h-3 rounded-full ${dotClass} inline-block`} />

      {/* dropdown (flex-grow) */}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border rounded p-2 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* remove */}
      <button
        onClick={onRemove}
        className="ml-2 w-8 h-8 border rounded flex items-center justify-center text-gray-600 cursor-pointer"
        title="Remove schema"
      >
        −
      </button>
    </div>
  );
};

export default SchemaRow;
