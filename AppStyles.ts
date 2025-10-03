// AppStyles.ts 
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFB6C1',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFB6C1',
    borderBottomWidth: 1,
    borderBottomColor: '#e91e63',
  },
  headerText: {
    fontSize: width < 768 ? 20 : 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
});