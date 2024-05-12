import {
  Button,
  Calendar,
  DatePicker as NUIDatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import CalendarIcon from "../assets/CalendarIcon";
import { today } from "@internationalized/date";

export default function DatePickerCompact({
  iconProps,
  calendarProps,
  className,
  ...props
}) {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button variant="light" className={"rounded-full" + " " + className} {...props}>
          <CalendarIcon
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
            {...iconProps}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          color="foreground"
          defaultValue={today()}
          {...calendarProps}
        ></Calendar>
      </PopoverContent>
    </Popover>
  );
}
