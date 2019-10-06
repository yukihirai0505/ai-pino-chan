## Deploy

```
$ now secret add line-channel-access-token ""
$ now secret add line-channel-secret ""
$ yarn deploy
```

## Local Development

```
$ mv .env.sample .env
$ vi .env # edit environment variables
$ yarn start
```

## Testing WebHook Event

[Message Event](https://developers.line.biz/ja/reference/messaging-api/#message-event)

```js
(async () => {
  const response = await fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{
               "events": [
                 {
                   "type": "message",
                   "replyToken": "hoge",
                   "source": {
                     "userId": "hoge",
                     "type": "user"
                   },
                   "timestamp": 1569991632077,
                   "message": { "type": "text", "id": "hoge", "text": "Hello World!" }
                 }
               ],
               "destination": "hoge"
             }
`,
  })
  console.log(response.json())
})()
```

ref: https://first-contact.jp/linebot

## About LINE Bot

* Create an account at [LINE for Business(JP)](https://www.linebiz.com/jp/)
* [LINE Official Account Manager](https://manager.line.biz/)
* [LINE Developers](https://developers.line.biz/ja/)

1. After creating an LINE Business Account, access to [LINE Developers](https://developers.line.biz/ja/) and create a new provider with Messaging API
2. Create Channel Token
3. Setup WebHook
4. Enable Messaging API
5. Disable Auto Reply feature

ref: https://first-contact.jp/linebot

