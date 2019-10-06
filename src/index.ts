import micro, { send, json } from 'micro'
import { router, get, post, ServerResponse, ServerRequest } from 'microrouter'
import * as line from '@line/bot-sdk'

const { LINE_CHANNEL_ACCESS_TOKEN, LINE_CHANNEL_SECRET } = process.env

const config = {
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: LINE_CHANNEL_SECRET!,
}

const webHookEvent = async (req: ServerRequest, res: ServerResponse) => {
  const data: any = await json(req)
  await Promise.all(data.events.map(handleEvent))
  return send(res, 200, 'ok')
}

const notFound = (_: ServerRequest, res: ServerResponse) =>
  send(res, 404, 'Not found route')

const handler = router(
  get('/', () => 'Hello World!'),
  post('/', webHookEvent),
  get('/*', notFound)
)

const client = new line.Client(config)
function handleEvent(event: line.MessageEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text,
  })
}

const server = micro(handler)

server.listen()
