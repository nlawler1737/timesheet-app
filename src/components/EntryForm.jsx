import "./EntryForm.css";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  TimeInput,
  Input,
  DatePicker,
  Spinner,
  Badge,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import DashIcon from "../assets/DashIcon";
import ChevronDownIcon from "../assets/ChevronDownIcon";
import { today, Time, now, parseDuration } from "@internationalized/date";
import { getProjects } from "../utils/entriesHandler";

export default function EntryForm({ onEntryAdd }) {
  const initialTime = getCurrentDateTime();
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [date, setDate] = useState(today());
  const [projects, setProjects] = useState(null);
  const [projectError, setProjectError] = useState(false);

  const [startDateTime, setStartDateTime] = useState(initialTime.copy());
  const [endDateTime, setEndDateTime] = useState(initialTime.copy());
  const startTime = new Time(startDateTime.hour, startDateTime.minute);
  const endTime = new Time(endDateTime.hour, endDateTime.minute);
  const timeDifference = endTime.compare(startTime);
  const totalTime = useMemo(() => {
    const difference = endDateTime.compare(startDateTime);
    const duration =
      difference < 0 ? difference + 24 * 60 * 60 * 1000 : difference;
    return { duration, ...getDuration(duration) };
  }, [startDateTime, endDateTime]);

  const [entryDuration, setEntryDuration] = useState(
    totalTimeString(totalTime)
  );

  const selectedProject = useMemo(() => {
    const [value] = selectedKeys.values();
    setProjectError(!!selectedKeys.size);
    return selectedKeys.size > 0 ? formatProjectName(value) : undefined;
  }, [selectedKeys]);

  useEffect(() => {
    updateProjects();
  }, []);

  useEffect(() => {
    setEntryDuration(totalTimeString(totalTime));
  }, [totalTime]);

  function updateProjects() {
    getProjects().then((projects) => {
      setProjects(projects.data);
    });
  }

  function handleAddClick(event) {
    if (selectedProject === undefined) {
      setProjectError(true);
      return;
    }
  }

  function handleTotalTimeBlur(event) {
    const value = event.target.value;
    const times = value.split(":").map((time) => (time ? parseInt(time) : 0));
    if (times.some((time) => isNaN(time))) {
      setEndDateTime(endDateTime.copy());
      return;
    }
    let [hours, minutes = 0, seconds = 0] = times;
    let days = 0;

    // if value is a number
    if (!isNaN(value)) {
      if (value.length > 2) {
        minutes = value.slice(-2);
        hours = parseInt(value.slice(0, -2)) + Math.floor(minutes / 60);
        minutes = minutes % 60;
      } else {
        hours = Math.floor(value / 60);
        minutes = value % 60;
      }
      days = Math.floor(hours / 24);
      hours = hours % 24;
    } else {
      minutes += Math.floor(seconds / 60);
      seconds = seconds % 60;
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
      days = Math.floor(hours / 24);
      hours = hours % 24;
    }

    setEndDateTime(
      startDateTime.add(
        parseDuration(`P0Y0M${days}DT${hours}H${minutes}M${seconds}S`)
      )
    );
  }

  function totalTimeString(totalTime) {
    const h = ("" + totalTime.hours).padStart(2, "0");
    const m = ("" + totalTime.minutes).padStart(2, "0");
    const s = ("" + totalTime.seconds).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  function formatProjectName(name) {
    return name.replaceAll("_", " ").replaceAll("-", " ");
  }

  function getCurrentDateTime() {
    const dateTime = now();
    dateTime.second = 0;
    dateTime.millisecond = 0;
    return dateTime;
  }

  function getDuration(milliseconds) {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  return (
    <div className="w-full flex gap-x-2 gap-y-3 flex-wrap lg:flex-nowrap items-center justify-center">
      <div className="flex gap-x-2 items-center grow">
        <Input
          type="text"
          className="min-w-40"
          placeholder="Summary"
          variant="bordered"
          radius="sm"
          size="sm"
        />
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              radius="sm"
              color={projectError ? "warning" : "default"}
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
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            disabledKeys={projects === null ? ["__no_project__"] : []}
            onAction={() => setProjectError(false)}
          >
            {projects !== null ? (
              projects.map((project) => (
                <DropdownItem key={project.name} className="capitalize">
                  {formatProjectName(project.name)}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem key="__no_project__" className="text-center">
                <Spinner size="sm" color="primary" />
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="flex gap-1 items-center">
        <TimeInput
          variant="bordered"
          radius="sm"
          className="w-min"
          aria-label="Start Time"
          size="sm"
          value={startTime}
          onChange={(time) => {
            startDateTime.hour = time.hour;
            startDateTime.minute = time.minute;
            setStartDateTime(startDateTime.copy());
          }}
        />
        <DashIcon className="w-2 h-2 text-default-300" />
        <Badge
          content={
            totalTime.duration >= 24 * 60 * 60 * 1000
              ? Math.floor(totalTime.duration / (1000 * 60 * 60 * 24))
              : timeDifference < 0
              ? 1
              : null
          }
          variant="faded"
          color="default"
          className="w-min"
          isInvisible={
            !(totalTime.duration >= 24 * 60 * 60 * 1000
              ? true
              : timeDifference < 0
              ? true
              : false)
          }
        >
          <TimeInput
            variant="bordered"
            radius="sm"
            aria-label="End Time"
            className="w-min"
            value={endTime}
            size="sm"
            onChange={(time) => {
              endDateTime.hour = time.hour;
              endDateTime.minute = time.minute;
              const difference = endDateTime.compare(startDateTime);
              if (difference < 0) {
                endDateTime.day = startDateTime.day + 1;
              } else if (
                difference >= 24 * 60 * 60 * 1000 &&
                difference < 48 * 60 * 60 * 1000
              ) {
                endDateTime.day = startDateTime.day;
              }
              setEndDateTime(endDateTime.copy());
            }}
          />
        </Badge>
      </div>
      <DatePicker
        variant="bordered"
        radius="sm"
        aria-label="Start Date"
        value={date}
        size="sm"
        className="entry-form--date-picker w-min"
        onChange={(date) => {
          const differenceInDays = date.compare(startDateTime);
          if (differenceInDays < 0) {
            const duration = parseDuration(
              `P0Y0M${Math.abs(differenceInDays)}DT0H0M0S`
            );
            setStartDateTime(startDateTime.subtract(duration));
            setEndDateTime(endDateTime.subtract(duration));
          } else {
            const duration = parseDuration(`P0Y0M${differenceInDays}DT0H0M0S`);
            setStartDateTime(startDateTime.add(duration));
            setEndDateTime(endDateTime.add(duration));
          }
          setDate(date);
        }}
      />
      <div className="min-w-20 max-w-20">
        <Input
          variant="underlined"
          fullWidth
          className="entry-form--total-time"
          size="sm"
          defaultValue={"00:00:00"}
          value={entryDuration}
          onValueChange={setEntryDuration}
          onBlur={handleTotalTimeBlur}
        />
      </div>
      <Button
        variant="solid"
        color="primary"
        radius="sm"
        size="sm"
        onClick={handleAddClick}
      >
        Add
      </Button>
    </div>
  );
}
