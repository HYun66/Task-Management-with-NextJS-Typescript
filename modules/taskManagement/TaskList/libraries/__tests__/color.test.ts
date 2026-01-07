import { getStatusColor } from '../color';

describe('modules taskManagement TaskList libraries color', () => {
  describe('getStatusColor', () => {
    it('returns correct color classes for pending status', () => {
      const result = getStatusColor('pending');

      expect(result).toBe('bg-primary-100 text-primary-800');
    });

    it('returns correct color classes for completed status', () => {
      const result = getStatusColor('completed');

      expect(result).toBe('bg-success-100 text-success-800');
    });

    it('returns default color classes for unknown status', () => {
      // @ts-expect-error Testing invalid status
      const result = getStatusColor('unknown-status');

      expect(result).toBe('bg-default-100 text-default-800');
    });

    it('returns default color classes for null status', () => {
      // @ts-expect-error Testing invalid status
      const result = getStatusColor(null);

      expect(result).toBe('bg-default-100 text-default-800');
    });

    it('returns default color classes for undefined status', () => {
      // @ts-expect-error Testing invalid status
      const result = getStatusColor(undefined);

      expect(result).toBe('bg-default-100 text-default-800');
    });
  });
});
