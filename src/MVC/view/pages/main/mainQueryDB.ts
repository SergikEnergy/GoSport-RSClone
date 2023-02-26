
import { iEvents } from "./TStype/mainTypes";
export const fetchEventByKind = async (url:URL,kind:string) => {
  try {
    const req = await fetch(url);
    const data = await req.json();
    return await filterEventsByKind(data,kind);
  }
  catch (e){
    console.log(e);
  }
}

function filterEventsByKind(eventsArr:Array<iEvents>, search:string):Array<iEvents> {
  return eventsArr
    .filter((values)=>(values.kind === search))
}

