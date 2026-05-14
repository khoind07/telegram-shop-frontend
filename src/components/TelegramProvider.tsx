'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import { SDKProvider, useLaunchParams } from '@telegram-apps/sdk-react';

export function TelegramProvider({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Tránh lỗi SSR khi sử dụng Telegram SDK
  }

  return (
    <SDKProvider acceptCustomStyles debug>
      {children}
    </SDKProvider>
  );
}
