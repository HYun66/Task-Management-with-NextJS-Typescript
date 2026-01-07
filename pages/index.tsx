'use client';

import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'common/ui';

const LandingPage = (): ReactElement => {
  const { push } = useRouter();

  useEffect(() => {
    void push('/tasks');
  }, []);

  return <Spinner position="middle" />;
};

export default LandingPage;
