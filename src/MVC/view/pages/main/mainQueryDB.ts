import { IEvent } from '../events/eventsType';

export const fetchEvents = async (url: URL) => {
  try {
    const req = await fetch(url);
    const data: [IEvent] = await req.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
