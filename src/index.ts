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
  console.log(JSON.stringify(data))
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

  return client.replyMessage(event.replyToken, [
    {
      type: 'text',
      text: event.message.text,
    },
    {
      type: 'image',
      originalContentUrl:
        'https://scontent-nrt1-1.cdninstagram.com/vp/40c51c08d3949b2f1745d6b9db267797/5D9C6B1F/t51.2885-15/e35/67921707_228180741477137_3189105514100041584_n.jpg?_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=105',
      previewImageUrl:
        'https://scontent-nrt1-1.cdninstagram.com/vp/40c51c08d3949b2f1745d6b9db267797/5D9C6B1F/t51.2885-15/e35/67921707_228180741477137_3189105514100041584_n.jpg?_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=105',
    },
  ])
}

const server = micro(handler)

server.listen()
