'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';

export function TelegramProvider({ children }: PropsWithChildren) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Khởi tạo SDK nếu cần ở đây
    import('@telegram-apps/sdk').then((sdk) => {
      if (sdk.backButton.isSupported()) {
        sdk.backButton.mount();
      }
      // Các khởi tạo khác...
    }).catch(err => console.error('SDK init error', err));
    
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
