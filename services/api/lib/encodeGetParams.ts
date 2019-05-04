export default function encodeGetParams(
  url: string,
  params: { [key: string]: string },
) {
  return [
    url.replace(/\?$/, ''),
    Object.entries(params)
      .map(([key, value]) =>
        [encodeURIComponent(key), encodeURIComponent(value)].join('='),
      )
      .join('&'),
  ].join('?')
}
