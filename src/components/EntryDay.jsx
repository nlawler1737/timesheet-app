import { Accordion, AccordionItem } from "@nextui-org/react";
import EntryItem from "./EntryItem";

export default function EntryDay() {
  const entry = {
    id: 1,
    start: "2024-05-11T05:05:00.808Z",
    end: "2024-05-11T05:05:00.808Z",
    project: "Project 1",
    summary: "Summary 1",
  };
  return (
    <div className="entry-day">
      <Accordion
        variant="splitted"
        itemClasses={{ base: "bg-red-500" }}
        className="px-0 gap-4"
        isCompact
        defaultExpandedKeys={["1", "2", "3"]}
        selectionMode="multiple"
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="Accordion 1"
          className="!bg-card !px-0 [&>h2]:px-4 [&>section>div]:py-0 [&>section>div]:gap-1 [&>section>div]:flex-col [&>section>div]:flex"
        >
          <div className="bg-[#27252D] w-full last:rounded-b-lg p-2">
            <EntryItem entry={entry} />
          </div>
          <div className="bg-[#27252D] w-full last:rounded-b-lg p-2">
            <EntryItem entry={entry} />
          </div>
          <div className="bg-[#27252D] w-full last:rounded-b-lg p-2">
            <EntryItem entry={entry} />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
