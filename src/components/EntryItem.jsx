import { useMemo, useState } from "react";
import { parseAbsoluteToLocal, now, Time } from "@internationalized/date";
import { getDuration } from "../utils/date";
import {
  Button,
  Input,
  TimeInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import DatePickerCompact from "./DatePickerCompact";
import ThreeDotsVerticalIcon from "../assets/ThreeDotsVerticalIcon";
import ChevronDownIcon from "../assets/ChevronDownIcon";
import { getProjects } from "../utils/entriesHandler";

/**
 * EntryItem is a component that displays the summary, project, start, end, date, and total of an entry
 *
 * @param {Object} param0
 * @param {import("../utils/entriesHandler").Entry} param0.entry
 * @returns
 */
export default function EntryItem({ entry }) {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState(new Set([]));

  const [summary, setSummary] = useState(entry.summary);
  const [project, setProject] = useState(entry.project);
  const [start, setStart] = useState(parseAbsoluteToLocal(entry.start));
  const [end, setEnd] = useState(parseAbsoluteToLocal(entry.end));

  const startTime = new Time(start.hour, start.minute);
  const endTime = new Time(end.hour, end.minute);

  const totalTime = useMemo(() => {
    const difference = end.compare(start);
    const duration =
      difference < 0 ? difference + 24 * 60 * 60 * 1000 : difference;
    return { duration, ...getDuration(duration) };
  }, [start, end]);

  const totalTimeString = useMemo(() => {
    const h = ("" + (totalTime.hours + totalTime.days * 24)).padStart(2, "0");
    const m = ("" + totalTime.minutes).padStart(2, "0");
    const s = ("" + totalTime.seconds).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [totalTime]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-grow items-center gap-2 ">
        <Input
          aria-label="Summary"
          variant="bordered"
          classNames={{
            inputWrapper: "[&:not(:hover)]:border-transparent",
          }}
          defaultValue={summary}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
        />
        <Dropdown
          onOpenChange={(open) => {
            if (open) {
              getProjects().then((projects) => setProjects(projects.data));
            }
          }}
        >
          <DropdownTrigger>
            <Button
              variant="bordered"
              radius="sm"
              className="capitalize shrink-0"
              size="sm"
              endContent={
                <ChevronDownIcon className={"w-4 h-4 text-inherit"} />
              }
            >
              {selectedProject || "Project"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedProjects}
            onSelectionChange={setSelectedProjects}
            disabledKeys={projects === null ? ["__no_project__"] : []}
          >
            {projects !== null ? (
              projects.map((project) => (
                <DropdownItem key={project.name} className="capitalize">
                  {project.name}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem key="__no_project__" className="text-center">
                No Projects
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex gap-2 items-center">
        <TimeInput
          aria-label="Start Time"
          variant="bordered"
          classNames={{
            inputWrapper: "[&:not(:hover)]:border-transparent",
          }}
          value={startTime}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onChange={(time) => {
            start.hour = time.hour;
            start.minute = time.minute;
            const dateDifference = end.compare(start);
            if (dateDifference <= 24 * 60 * 60 * 1000) {
              end.day = start.day;
              setEnd(end.copy());
            }
            setStart(start.copy());
          }}
        />
        <TimeInput
          aria-label="End Time"
          variant="bordered"
          classNames={{
            inputWrapper: "[&:not(:hover)]:border-transparent",
          }}
          value={endTime}
          onKeyDown={(e) => e.stopPropagation()}
          onChange={(time) => {
            end.hour = time.hour;
            end.minute = time.minute;
            const dateDifference = end.compare(start);
            if (dateDifference < 0) {
              end.day = start.day + 1;
            } else if (dateDifference <= 24 * 60 * 60 * 1000) {
              end.day = start.day;
            }
            setEnd(end.copy());
          }}
        />
        <DatePickerCompact className="min-w-10 aspect-square" />
      </div>
      <div className="flex items-center gap-2">
        <Input variant="underlined" defaultValue={totalTimeString} />
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="light"
              color="default"
              className="min-w-5 aspect-square p-2"
            >
              <ThreeDotsVerticalIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select Action">
            <DropdownItem key="delete" color="danger" className="text-danger ">Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

/*
when end time is before start time, the end date should be the next day
*/
