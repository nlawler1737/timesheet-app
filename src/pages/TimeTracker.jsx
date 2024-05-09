import { useEffect } from "react";
import EntryForm from "../components/EntryForm";
import { getEntries } from "../utils/entriesHandler";

export default function TimeTracker() {
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
      <EntryForm />
    </div>
  );
}
