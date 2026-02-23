import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import VueRouter from 'vue-router';
import KSnackbar from '../KSnackbar.vue';

describe('KSnackbar component', () => {
  let router;

  beforeEach(() => {
    jest.useFakeTimers();
    router = new VueRouter({ routes: [] });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
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

    it('calls actionCallback when action button is clicked', async () => {
      const user = userEvent.setup({ delay: null });
      const actionCallback = jest.fn();

      render(KSnackbar, {
        props: {
          isOpen: true,
          text: 'Message',
          actionText: 'Undo',
          actionCallback,
        },
        routes: router,
      });

      await user.click(screen.getByRole('button', { name: 'Undo' }));
      expect(actionCallback).toHaveBeenCalledTimes(1);
    });

    it('emits close event when action button is clicked', async () => {
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
      expect(emitted().close).toBeTruthy();
    });
  });

  describe('auto-hide behavior', () => {
    it('emits close event after duration', async () => {
      const { emitted, updateProps } = render(KSnackbar, {
        props: {
          isOpen: false,
          text: 'Message',
          duration: 3000,
        },
        routes: router,
      });
      await updateProps({ isOpen: true });
      jest.advanceTimersByTime(3000);
      await waitFor(() => {
        expect(emitted().close).toBeTruthy();
        expect(emitted().close).toHaveLength(1);
      });
    });

    it('resets timer when text changes', async () => {
      const { emitted, updateProps } = render(KSnackbar, {
        props: {
          isOpen: false,
          text: 'Original message',
          duration: 3000,
        },
        routes: router,
      });

      await updateProps({ isOpen: true });
      jest.advanceTimersByTime(2000);
      await updateProps({ text: 'Updated message' });
      jest.advanceTimersByTime(2000);
      expect(emitted().close).toBeFalsy();
      jest.advanceTimersByTime(1000);
      await waitFor(() => {
        expect(emitted().close).toBeTruthy();
      });
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
});
