'use client';

import { NextIntlClientProvider } from 'next-intl';

type Props = {
  locale: string;
  messages: IntlMessages;
  children: React.ReactNode;
  timeZone: string;
  now: Date;
};

export default function IntlProvider({
  children,
  locale,
  messages,
  timeZone,
  now,
}: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
      now={now}
      onError={(error) => {
        console.error(error);
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}