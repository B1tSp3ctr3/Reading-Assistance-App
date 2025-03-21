
import { useState, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

// Make sure defaultSearchOptions is defined
const defaultSearchOptions = {
  placeholder: 'Search...',
  // ...other default options
};

export const useNavigationSearch = ({ searchBarOptions }) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  // Check if navigation is available
  if (!navigation) {
    console.warn('Navigation object is not available. Ensure this hook is used within a NavigationContainer.');
    return search;
  }

  const handleOnChangeText = (event) => {
    const text = event?.nativeEvent?.text;
    if (text !== undefined) {
      setSearch(text);
    }
  };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                ...defaultSearchOptions,
                ...searchBarOptions,
                onChangeText: handleOnChangeText,
            },
        });
    }, [navigation, searchBarOptions]);

  return search;
};
