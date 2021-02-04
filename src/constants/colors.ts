import { rgba } from 'polished';

const ABSTRACT_BLACK = '#000000';
const ABSTRACT_STRONG_GRAY = '#333333';
const ABSTRACT_GRAY = '#999999';
const ABSTRACT_WHITE = '#ffffff';
const ABSTRACT_NAVY = '#114086';
const ABSTRACT_PALE_GRAY = rgba(ABSTRACT_BLACK, 0.5);

export const Colors = {
  UI_BASE: ABSTRACT_BLACK,
  UI_PAPER: ABSTRACT_WHITE,
  UI_TEXT_MAIN: ABSTRACT_BLACK,
  UI_TEXT_WEAKEN: ABSTRACT_PALE_GRAY,
  UI_TEXT_SUB: ABSTRACT_GRAY,
  UI_TEXT_DARK_BACKGROUND: ABSTRACT_WHITE,
  UI_LINE_NORMAL: ABSTRACT_BLACK,
  UI_LINE_WEAKEN: ABSTRACT_GRAY,
  UI_OBJECT_PLACEHOLDER: ABSTRACT_PALE_GRAY,
  ABSTRACT_BLACK,
  ABSTRACT_STRONG_GRAY,
  ABSTRACT_GRAY,
  ABSTRACT_PALE_GRAY,
  ABSTRACT_WHITE,
  ABSTRACT_NAVY,
  TRANSPARENT: 'transparent',
} as const;

export default Colors;
