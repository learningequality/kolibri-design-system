import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import VueRouter from 'vue-router';
import KSnackbar from '../KSnackbar.vue';

describe('KSnackbar component', () => {
  let router;

  beforeEach(() => {
    router = new VueRouter({ routes: [] });
  });

  describe('rendering', () => {
    it('renders when isOpen is true', () => {
      render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Test message',
        },
        routes: router,
      });

      expect(screen.getByTestId('snackbar')).toBeInTheDocument();
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(KSnackbar, {
        props: {
          isOpen: false,
          text: 'Test message',
        },
        routes: router,
      });

      expect(screen.queryByTestId('snackbar')).not.toBeInTheDocument();
    });
  });

  describe('action button', () => {
    it('renders action button when actionText is provided', () => {
      render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
          actionText: 'Undo',
        },
        routes: router,
      });

      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    });

    it('does not render action button when actionText is not provided', () => {
      render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
        },
        routes: router,
      });

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('emits action-click event when action button is clicked', async () => {
      const user = userEvent.setup({ delay: null });

      const { emitted } = render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
          actionText: 'Undo',
        },
        routes: router,
      });

      await user.click(screen.getByRole('button', { name: 'Undo' }));
      expect(emitted()['action-click']).toBeTruthy();
      expect(emitted()['action-click']).toHaveLength(1);
    });
  });

  describe('backdrop', () => {
    it('renders backdrop when backdrop prop is true', () => {
      const { container } = render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
          backdrop: true,
        },
        routes: router,
      });

      expect(container.querySelector('.k-snackbar-backdrop')).toBeInTheDocument();
    });

    it('does not render backdrop when backdrop prop is false', () => {
      const { container } = render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
          backdrop: false,
        },
        routes: router,
      });

      expect(container.querySelector('.k-snackbar-backdrop')).not.toBeInTheDocument();
    });
  });
  describe('events', () => {
    it('emits click event when snackbar is clicked', async () => {
      const user = userEvent.setup({ delay: null });

      const { emitted } = render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
        },
        routes: router,
      });

      await user.click(screen.getByTestId('snackbar'));
      expect(emitted().click).toBeTruthy();
    });
  });

  describe('auto-hide timer', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('emits close event after duration when autoDismiss is true', async () => {
      const { emitted, updateProps } = render(KSnackbar, {
        props: {
          isOpen: false,
          text: 'Message',
          autoDismiss: true,
          duration: 3000,
        },
        routes: router,
      });

      await updateProps({ isOpen: true });

      expect(emitted().close).toBeFalsy();

      jest.advanceTimersByTime(3000);

      expect(emitted().close).toBeTruthy();
      expect(emitted().close).toHaveLength(1);
    });

    it('does not emit close event when autoDismiss is false', () => {
      const { emitted } = render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
          autoDismiss: false,
          duration: 3000,
        },
        routes: router,
      });

      jest.advanceTimersByTime(3000);

      expect(emitted().close).toBeFalsy();
    });

    it('resets timer when text changes (forceReuse case)', async () => {
      const { emitted, updateProps } = render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Original message',
          autoDismiss: true,
          duration: 3000,
        },
        routes: router,
      });

      jest.advanceTimersByTime(2000);

      await updateProps({ text: 'Updated message' });

      jest.advanceTimersByTime(2000);
      expect(emitted().close).toBeFalsy();

      jest.advanceTimersByTime(1000);
      expect(emitted().close).toBeTruthy();
    });
  });
});
