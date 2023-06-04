import { StyleSheet, View, ViewProps } from 'react-native';

import { layout } from 'constant';

const { padding } = layout.spacing;

interface ContainerProps extends ViewProps {
  children?: React.ReactNode;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  style?: ViewProps['style'];
  backgroundColor?: string;
  paddingVertical?: number;
}

export default function Container({
  alignItems,
  children,
  paddingVertical,
  style,
  backgroundColor,
  ...props
}: ContainerProps): JSX.Element | null {
  return (
    <View
      style={[
        { padding, paddingVertical },
        style,
        styles.container,
        {
          alignItems,
          backgroundColor: backgroundColor,
        },
      ]}
      {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
