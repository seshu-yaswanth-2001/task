import { useState } from "react";
import SegmentModal from "./components/SegmentModal";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start">
      <div className={`${open ? "w-3/4 blur-sm opacity-60" : "w-screen"} p-8`}>
        <header className="bg-teal-700 text-white p-4 rounded-b">
          <div className="container mx-auto">View Audience</div>
        </header>

        <div className="p-8">
          <button
            onClick={() => setOpen(true)}
            className="border-2  bg-transparent text-black px-6 py-3 rounded cursor-pointer"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            Save segment
          </button>

          <p className="mt-6 text-gray-600">(page content placeholder)</p>
        </div>
      </div>

      {open && <SegmentModal onClose={() => setOpen(false)} />}
    </div>
  );
};

export default App;
