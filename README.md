# jq Filter Feed

## Synopsis

This is a microservice to filter a JSON webservice inline with jq

## API Reference

The feed can be started via the command line.

```
jq-filter-feed 'http://example.com/service'
```
is the same as
```
jq-filter-feed 'http://example.com/service' --jq '.'
```
or
```
jq-filter-feed -p 3000 'http://example.com/service' --jq '.'
```

## Motivation

Sometimes I want to filter json inline!

## Installation

```
npm install jq-filter-feed -g
```

## Code Example

```javascript
var config = {
  url: options.url,
  port: options.port,
  jq: options.jq
}

var server = new JQFilterFeed(config);
```

## Tests

None right now :(

## Contributors

You're heartily encouraged to start issues or pull requests

## License

Apache-2
