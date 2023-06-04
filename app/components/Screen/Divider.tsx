import { View } from 'react-native';

import { layout } from 'constant';
const { l, m, s, xl, xxl, xs, r } = layout.spacing;

interface Props {
  space?: 't' | 's' | 'm' | 'm2' | 'l' | 'xl' | 'xxl';
  horizontal?: boolean;
}

/**
 *
 * @param space t: 4, s: 8, m: 16, l: 25, xl: 32, xxl: 64
 * @returns 16
 */

export default function Divider({
  space,
  horizontal = false,
}: Props): JSX.Element {
  let margin = 0;
  const styleProperty = horizontal ? 'marginLeft' : 'marginTop';

  switch (space) {
    case 't':
      margin = xs;
      break;
    case 's':
      margin = s;
      break;
    case 'm':
      margin = m;
      break;
    case 'm2':
      margin = r;
      break;
    case 'l':
      margin = l;
      break;
    case 'xl':
      margin = xl;
      break;
    case 'xxl':
      margin = xxl;
      break;
    default:
      margin = m;
      break;
  }

  return <View style={{ [styleProperty]: margin }} />;
}
