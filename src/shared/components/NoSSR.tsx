import dynamic from 'next/dynamic';
import React from 'react';

function NoSSR({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (typeof window === 'undefined' && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
