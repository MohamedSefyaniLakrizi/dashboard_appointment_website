import React from "react";
import { CalendarBody } from "@/app/components/calendar/calendar-body";
import { CalendarProvider } from "@/app/components/calendar/contexts/calendar-context";
import { DndProvider } from "@/app/components/calendar/contexts/dnd-context";
import { CalendarHeader } from "@/app/components/calendar/header/calendar-header";
import { getAppointments, getClients } from "@/lib/actions/appointments";

async function getCalendarData() {
  return {
    events: await getAppointments(),
    users: await getClients(),
  };
}

export async function Calendar() {
  const { events, users } = await getCalendarData();

  return (
    <CalendarProvider events={events} users={users} view="month">
      <DndProvider showConfirmation={false}>
        <div className="h-full w-full border rounded-xl">
          <CalendarHeader />
          <CalendarBody />
        </div>
      </DndProvider>
    </CalendarProvider>
  );
}
