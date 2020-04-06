import React, { createContext, useState, useEffect, useContext } from 'react';
import { config } from '../firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import { groupBy, sumBy, orderBy } from 'lodash';
import moment from 'moment';

firebase.initializeApp(config);

const rootRef = firebase.database().ref('/');
const updateRef = firebase.database().ref('/updatedAt');

export const DataContext = createContext();

export const DataProvider = props => {
  const [data, setData] = useState(null);
  const [selectedCounty, setSelectedCounty] = useState(null);

  useEffect(() => {
    // Listen to 'update' property changes
    updateRef.on('value', snapshot => {
      if (!data || data.updatedAt !== snapshot.val()) {
        rootRef.on('value', snapshot => {
          const newData = snapshot.val();

          // Update data for each county
          const casesByCounties = groupBy(newData.cases, 'county');
          const deathsByCounties = groupBy(newData.deaths, 'county');
          const curesByCounties = groupBy(newData.cures, 'county');

          let counties = [];
          const today = moment().format('YYYY-MM-DD');

          for (let county of newData.counties) {
            counties.push({
              ...county,
              cases: {
                total: sumBy(casesByCounties[county.name], 'count'),
                today: sumBy(groupBy(casesByCounties[county.name], 'date')[today], 'count'),
              },
              deaths: {
                total: sumBy(deathsByCounties[county.name], 'count'),
                today: sumBy(groupBy(deathsByCounties[county.name], 'date')[today], 'count'),
              },
              cures: {
                total: sumBy(curesByCounties[county.name], 'count'),
                today: sumBy(groupBy(curesByCounties[county.name], 'date')[today], 'count'),
              },
            });
          }

          counties = orderBy(counties, county => county.cases.total, 'desc');

          // Update overall data
          const cases = {
            total: sumBy(newData.cases, 'count'),
            today: sumBy(groupBy(newData.cases, 'date')[today], 'count'),
          };
          const deaths = {
            total: sumBy(newData.deaths, 'count'),
            today: sumBy(groupBy(newData.deaths, 'date')[today], 'count'),
          };
          const cures = {
            total: sumBy(newData.cures, 'count'),
            today: sumBy(groupBy(newData.cures, 'date')[today], 'count'),
          };

          setData({
            counties,
            updatedAt: newData.updatedAt,
            cases,
            cures,
            deaths,
          });
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

export const useData = () => {
  return useContext(DataContext);
};
