import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@nextui-org/react";
import "./EntryWeek.css";
import EntryDay from "./EntryDay";

export default function EntryWeek({ className }) {
  const [expanded, setExpanded] = useState(new Set(["1", "2", "3"]));
  return (
    <div className={"entry-week " + className}>
      <Accordion
        selectionMode="multiple"
        defaultExpandedKeys={expanded}
        onSelectionChange={setExpanded}
        isCompact
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title={<Title title={"Accordion 1"} showLine={!expanded.has("1")} />}
          hideIndicator={true}
        >
          <EntryDay />
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function Title({ title, showLine }) {
  return (
    <div className="grow flex items-center justify-between">
      <BorderContainer children={title} />
      <motion.div
        className="h-0.5 bg-primary mx-7 rounded-full"
        animate={{ flexGrow: showLine ? [0, 0.99, 1] : 0 }}
      ></motion.div>
      <BorderContainer>
        <div className="flex items-center gap-3">
          <span className="text-sm">Week Total</span> 00:00:00
        </div>
      </BorderContainer>
    </div>
  );
}

function BorderContainer({ children }) {
  return (
    <div className="flex items-center border-2 rounded-lg border-primary px-4 py-0 text-foreground">
      {children}
    </div>
  );
}
