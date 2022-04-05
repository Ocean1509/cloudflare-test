export default {

  async fetch(request: Request, env: any, context: EventContext<unknown, string, Record<string, unknown>>) {
    console.log(request.url, request.method, '----')
    let str = await env.DATATEST.get('dddd')
    return new Response(str, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  },

  async scheduled(event: ScheduledEvent, env: any, context: EventContext<unknown, string, Record<string, unknown>>) {
    context.waitUntil(triggerEvent(event, env));
  },
}

async function triggerEvent(event: ScheduledEvent, env: any) {
  await env.DATATEST.put('dddd', new Date().getMinutes().toString())
}