import { renderToString } from 'react-dom/server';
import { RemixServer } from 'remix';
import { getCssText } from '~/stitches.config';

import type { EntryContext } from 'remix';

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />).replace(
    /<\/head>/,
    `<style>${getCssText()}</style></head>`
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
