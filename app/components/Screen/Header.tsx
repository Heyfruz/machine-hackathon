import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { Text } from '../General';

import { useHeaderHeight } from 'hooks';
import { layout, pallets } from 'constant';
import { DrawerRoutes } from 'navigation';

const { fonts, spacing } = layout;

interface Props {
  backgroundColor?: string;
  handleCloseIcon?: () => void;
  hideLeftComp?: boolean;
  itemColor?: string;
  leftLabel?: string;
  onLeftLabelPress?: () => void;
  onRightLabelPress?: () => void;
  rightLabel?: string;
  showCloseIcon?: boolean;
  title: string;
  drawer?: boolean;
}

type ExtendProps = Omit<
  Props,
  'title' | 'backgroundColor' | 'rightLabel' | 'onRightLabelPress'
>;

interface BackProps extends ExtendProps {
  canGoBack: boolean;
  onDrawerPress?: () => void;
  handleBack: () => void;
}

export default function Header({
  title,
  showCloseIcon,
  handleCloseIcon,
  leftLabel,
  drawer,
  hideLeftComp,
  itemColor,
  rightLabel,
  onLeftLabelPress,
  backgroundColor,
  onRightLabelPress,
}: Props): JSX.Element {
  const { insets, headerHeight } = useHeaderHeight();
  const navigation = useNavigation<DrawerNavigationProp<DrawerRoutes>>();

  const handleBack = () => navigation.canGoBack() && navigation.goBack();
  const canGoBack = navigation.canGoBack();

  return (
    <>
      <View style={{ backgroundColor, height: insets.top }} />
      <View
        style={[
          styles.header,
          {
            backgroundColor,
            height: headerHeight - insets.top,
            paddingHorizontal: spacing.padding,
          },
        ]}>
        <View style={styles.headerActions}>
          <Back
            {...{
              canGoBack,
              drawer,
              handleBack,
              handleCloseIcon,
              hideLeftComp,
              itemColor,
              leftLabel,
              onLeftLabelPress,
              showCloseIcon,
            }}
            onDrawerPress={() => navigation?.toggleDrawer()}
          />
          {Boolean(rightLabel) && (
            <TouchableOpacity activeOpacity={0.7} onPress={onRightLabelPress}>
              <Text
                variant="medium"
                size={fonts.subhead}
                color={itemColor || pallets.primary}>
                {rightLabel || 'Go'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.titleBox}>
          <Text
            variant="bold"
            size={fonts.body}
            color={itemColor}
            textTransform="uppercase">
            {title}
          </Text>
        </View>
      </View>
    </>
  );
}

const Back = ({
  canGoBack,
  handleBack,
  hideLeftComp,
  showCloseIcon,
  handleCloseIcon,
  drawer,
  onDrawerPress,
  itemColor,
  onLeftLabelPress,
  leftLabel,
}: BackProps): JSX.Element => {
  switch (true) {
    case hideLeftComp:
      return <View />;
    case drawer:
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onDrawerPress?.();
          }}>
          <Icon name="menu" size={20} color={pallets.primary} />
        </TouchableOpacity>
      );
    case Boolean(leftLabel):
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={onLeftLabelPress}>
          <Text
            variant="medium"
            size={fonts.subhead}
            color={itemColor || pallets.primary}>
            {leftLabel}
          </Text>
        </TouchableOpacity>
      );
    case canGoBack && !showCloseIcon:
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={handleBack}>
          <Text
            variant="medium"
            size={fonts.subhead}
            color={itemColor || pallets.primary}>
            {leftLabel || 'Back'}
          </Text>
        </TouchableOpacity>
      );
    case showCloseIcon:
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleCloseIcon?.() || handleBack();
          }}>
          <Icon name="close" size={20} color={pallets.darkGrey} />
        </TouchableOpacity>
      );
    default:
      return <View />;
  }
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerActions: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBox: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    left: spacing.padding,
    position: 'absolute',
    width: '100%',
    zIndex: -1,
  },
});
