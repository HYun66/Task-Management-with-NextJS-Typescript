import { Spinner as NextSpinner } from '@heroui/spinner';
import { extendVariants } from '@heroui/system';

export const Spinner = extendVariants(NextSpinner, {
  variants: {
    position: {
      middle: {
        base: ['flex', 'h-screen'],
      },
      center: {
        base: ['flex', 'h-full', 'w-full'],
      },
      horizontalCenter: {
        base: ['flex', 'justify-center', 'w-full'],
      },
    },
  },
});
