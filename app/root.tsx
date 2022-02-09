import * as React from 'react';
import * as Remix from 'remix';
import { getCssText, styled } from '~/stitches.config';

import type { MetaFunction } from 'remix';

const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

const Box = styled('div');

const Document = (props: { children: React.ReactNode }) => {
  const [throwError, setThrowError] = React.useState(false);

  if (throwError) {
    throw new Error('you requested an error be thrown');
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Remix.Meta />
        <Remix.Links />
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body>
        <Box
          css={{
            backgroundColor: 'LightPink',
            padding: '2em',
            fontSize: 24,
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            gap: '1em',
          }}
        >
          <Box>This text and button should be inside a pink box.</Box>
          <Box as="button" onClick={() => setThrowError(true)} css={{ fontSize: 'inherit' }}>
            Click me to trigger the ErrorBoundary
          </Box>
        </Box>
        {props.children}
        <Remix.ScrollRestoration />
        <Remix.Scripts />
        {process.env.NODE_ENV === 'development' && <Remix.LiveReload />}
      </body>
    </html>
  );
};

const App = () => (
  <Document>
    <Remix.Outlet />
  </Document>
);

const ErrorBoundary = (props: { error: Error }) => (
  <Document>
    <h1>This is the root route's ErrorBoundary</h1>
    <p>Error: {props.error.message}</p>
  </Document>
);

export default App;
export { meta, ErrorBoundary };
