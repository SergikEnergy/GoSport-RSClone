
export const fetchEventByKind = async (url:URL,kind:string) => {
  try {
    const req = await fetch(url);
    const data = await req.json();
    return filterEventsByKind(data,kind)
  }
  catch (e){
    console.log(e);
  }
}
interface iEvents {
  kind: string,
  date?: { type: string},
  id_place?: { type: string},
  time_start?: { type: string},
  time_end?: { type: string},
  place_name?: { type: string},


}
function filterEventsByKind(eventsArr:Array<iEvents>, search:string):Array<unknown> {
  return eventsArr
    .filter((values)=>(values.kind === search))
}

