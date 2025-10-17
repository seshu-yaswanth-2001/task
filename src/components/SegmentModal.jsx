import { useMemo, useState } from "react";
import axios from "axios";
import SchemaRow from "./SchemaRow";

const ALL_OPTIONS = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "user" },
  { label: "State", value: "state", type: "user" },
];

const SegmentModal = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedToAdd, setSelectedToAdd] = useState("");

  const usedValues = useMemo(() => rows.map((r) => r.value), [rows]);
  const available = useMemo(
    () => ALL_OPTIONS.filter((o) => !usedValues.includes(o.value)),
    [usedValues]
  );

  const handleAdd = () => {
    if (!selectedToAdd) return;
    const opt = ALL_OPTIONS.find((o) => o.value === selectedToAdd);
    if (!opt) return;
    setRows((prev) => [...prev, opt]);
    setSelectedToAdd("");
  };

  const handleRowChange = (index, newValue) => {
    const newOpt = ALL_OPTIONS.find((o) => o.value === newValue);
    setRows((prev) => prev.map((r, i) => (i === index ? newOpt : r)));
  };

  const handleRemove = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!segmentName.trim()) {
      alert("Please enter a segment name.");
      return;
    }
    if (rows.length === 0) {
      alert("Add at least one schema.");
      return;
    }

    const payload = {
      segment_name: segmentName.trim(),
      schema: rows.map((r) => ({ [r.value]: r.label })),
    };

    // console.log("Sent Successful: ", payload);

    try {
      const WEBHOOK = "/api/webhook";
      const response = await axios.post(WEBHOOK, payload);
      // console.log("Response: ", response);
      alert("Segment saved successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to send payload. Check console.");
    }
  };

  return (
    <aside className="w-1/3 bg-white min-h-screen shadow-lg">
      <div className="sticky top-0 bg-teal-500 p-4 text-white flex items-center gap-4">
        <button onClick={onClose} className="text-white text-xl cursor-pointer">
          ◀
        </button>
        <h3 className="font-semibold">Saving Segment</h3>
      </div>

      <div className="p-6">
        <label className="block text-sm font-medium text-gray-700">
          Enter the Name of the Segment
        </label>
        <input
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          className="mt-2 w-full border rounded px-3 py-2"
        />

        <p className="mt-4 text-sm text-gray-600">
          To save your segment, you need to add the schemas to build the query
        </p>

        <div className="flex items-center gap-4 mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
            <span>- User Traits</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span>- Group Traits</span>
          </div>
        </div>

        <div className="mt-6">
          {rows.map((row, idx) => {
            const optionsForRow = ALL_OPTIONS.filter(
              (o) => !usedValues.includes(o.value) || o.value === row.value
            );
            return (
              <SchemaRow
                key={idx}
                index={idx}
                value={row.value}
                label={row.label}
                type={row.type}
                options={optionsForRow}
                onChange={(newVal) => handleRowChange(idx, newVal)}
                onRemove={() => handleRemove(idx)}
              />
            );
          })}

          <div className="mt-3">
            <select
              value={selectedToAdd}
              onChange={(e) => setSelectedToAdd(e.target.value)}
              className="w-full border p-2 rounded cursor-pointer"
            >
              <option value="">Add schema to segment</option>
              {available.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <button
              onClick={handleAdd}
              className="mt-2 text-green-600 font-medium hover:underline cursor-pointer"
            >
              + Add new schema
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save the Segment
          </button>
          <button
            onClick={onClose}
            className="border border-pink-300 text-pink-600 px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SegmentModal;
