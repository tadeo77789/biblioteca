import { useWindowDimensions } from 'react-native';

export default function useBreakpoint() {
  const { width } = useWindowDimensions();
  return {
    width,
    isMobile: width < 720,
    isTablet: width >= 720 && width < 1024,
    isDesktop: width >= 1024,
    columns: width < 520 ? 1 : width < 820 ? 2 : width < 1180 ? 3 : 4,
  };
}
