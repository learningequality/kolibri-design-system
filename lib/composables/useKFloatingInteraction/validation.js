import {
  INTERACTION_OPTION_DEFAULTS,
  DEACTIVATE_ON_DEFAULTS,
  NON_DELEGATED_WARN_LIMIT,
} from './constants';
import { isObject } from './utils';

// ==================================================================
// Developer warning when many non-delegated floating
// elements detected

// To show the warning only once per page rather with
// every floating element mount
let hasWarnedManyNonDelegated = false;

// Resets the state above, for tests
export function _resetWarnings() {
  hasWarnedManyNonDelegated = false;
}

export function warnIfManyNonDelegated(nonDelegatedCount) {
  if (
    process.env.NODE_ENV !== 'development' ||
    hasWarnedManyNonDelegated ||
    nonDelegatedCount <= NON_DELEGATED_WARN_LIMIT
  ) {
    return;
  }
  hasWarnedManyNonDelegated = true;
  // eslint-disable-next-line no-console
  console.warn(
    `[useKFloatingInteraction] There are more than ${NON_DELEGATED_WARN_LIMIT} floating elements on this page. You may want to consider event delegation. See ` +
      `https://design-system.learningequality.org/usekfloatinginteraction/#performance`,
  );
}

// ==================================================================
// Validation and normalization of composable options

export function normalizeDeactivateOn(deactivateOn) {
  if (!deactivateOn) {
    return { ...DEACTIVATE_ON_DEFAULTS };
  }
  if (!isObject(deactivateOn)) {
    throw new Error(`[useKFloatingInteraction] 'deactivateOn' needs to be an object.`);
  }

  const supportedKeys = Object.keys(DEACTIVATE_ON_DEFAULTS);
  const unknownKeys = Object.keys(deactivateOn).filter(key => !supportedKeys.includes(key));

  if (unknownKeys.length) {
    throw new Error(
      `[useKFloatingInteraction] 'deactivateOn' contains unsupported key(s): ${unknownKeys.join(', ')}. Supported keys are: ${supportedKeys.join(', ')}`,
    );
  }

  supportedKeys.forEach(key => {
    const expectedType = typeof DEACTIVATE_ON_DEFAULTS[key];
    if (key in deactivateOn && typeof deactivateOn[key] !== expectedType) {
      throw new Error(
        `[useKFloatingInteraction] 'deactivateOn.${key}' needs to be a ${expectedType}.`,
      );
    }
  });

  return { ...DEACTIVATE_ON_DEFAULTS, ...deactivateOn };
}

export function normalizeInteractions(interactions) {
  if (!interactions) {
    return {};
  }

  const supportedNames = Object.keys(INTERACTION_OPTION_DEFAULTS);

  let interactionsObj;
  if (Array.isArray(interactions)) {
    interactionsObj = {};
    interactions.forEach(name => {
      interactionsObj[name] = {};
    });
  } else if (isObject(interactions)) {
    interactionsObj = interactions;
  } else {
    throw new Error(
      `[useKFloatingInteraction] 'interactions' needs to be an array of interaction names or an object mapping a name to its options. Supported interactions are: ${supportedNames.join(', ')}`,
    );
  }

  const names = Object.keys(interactionsObj);
  const normalized = {};
  names.forEach(name => {
    const defaults = INTERACTION_OPTION_DEFAULTS[name];
    if (!defaults) {
      throw new Error(
        `[useKFloatingInteraction] 'interactions' contains an unsupported interaction '${name}'. Supported interactions are: ${supportedNames.join(', ')}`,
      );
    }

    let options = interactionsObj[name];
    if (options === true || options === undefined || options === null) {
      options = {};
    } else if (!isObject(options)) {
      throw new Error(
        `[useKFloatingInteraction] Options for interaction '${name}' need to be an object or true.`,
      );
    }
    const supportedOptions = Object.keys(defaults);
    Object.keys(options).forEach(key => {
      if (!(key in defaults)) {
        const prefix = `[useKFloatingInteraction] '${key}' is not a supported option for interaction '${name}'.`;
        throw new Error(
          supportedOptions.length
            ? `${prefix} Supported options are: ${supportedOptions.join(', ')}.`
            : `${prefix} It takes no options.`,
        );
      }
      const expectedType = typeof defaults[key];
      if (typeof options[key] !== expectedType) {
        throw new Error(
          `[useKFloatingInteraction] '${key}' for interaction '${name}' needs to be a ${expectedType}.`,
        );
      }
    });
    normalized[name] = { ...defaults, ...options };
  });
  return normalized;
}
