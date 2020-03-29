import React, { createContext, useState, useEffect } from 'react';
import { config } from '../firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import compareValues from '../helpers/compareValues';

firebase.initializeApp(config);

// const database = firebase.database().

const rootRef = firebase.database().ref('/');
const updateRef = firebase.database().ref('/update');

export const DataContext = createContext();

export const DataProvider = props => {
  const [data, setData] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);

  useEffect(() => {
    // Listen to 'update' property changes
    updateRef.on('value', snapshot => {
      if (!data || data.update !== snapshot.val()) {
        rootRef.on('value', snapshot => {
          const newData = snapshot.val();
          newData.counties.sort(compareValues('confirmedCases', 'desc'));

          setData(newData);
        });

        updateRef.off('value');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider value={{ ...data, selectedCounty, setSelectedCounty }}>
      {props.children}
    </DataContext.Provider>
  );
};
