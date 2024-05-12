import { useEffect, useState } from "react";
import EntryForm from "../components/EntryForm";
import { getEntries } from "../utils/entriesHandler";
import EntryWeek from "../components/EntryWeek";

export default function TimeTracker() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    updateEntries();
  }, []);

  function updateEntries() {
    getEntries().then((entries) => {
      setEntries(entries.data);
    });
  }

  return (
    <div className="p-8">
      <div className="w-full bg-container rounded-lg py-3 px-4">
        <EntryForm />
      </div>

      <EntryWeek className="mt-8" />
    </div>
  );
}
