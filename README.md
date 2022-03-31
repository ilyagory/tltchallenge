# Installation

1. `npm i`
1. `cp config{.example,}.json`
1. Fill config.json with own values
1. `npm start`

# Demo CURL query

```shell
 curl -v -X POST \
 -H 'Content-Type:application/json' \
 -H 'X-Api-Key:<config.app.apiKey>' \
 --data @data.json \
 http://localhost:<config.app.port>
```