import React, { createContext, useState, useEffect, useContext } from 'react';
import { config } from '../config';
import Airtable from 'airtable';

Airtable.configure({
  endpointUrl: config.apiUrl,
  apiKey: config.apiKey,
});
const base = Airtable.base(config.baseId);

export const DataContext = createContext();

export const DataProvider = props => {
  const [data, setData] = useState({});
  const [selectedCounty, setSelectedCounty] = useState(null);

  useEffect(() => {
    base('counties')
      .select({
        fields: [
          'name',
          'lon',
          'lat',
          'code',
          'total cases',
          'today cases',
          'total cures',
          'today cures',
          'total deaths',
          'today deaths',
          'last update',
        ],
        sort: [{ field: 'last update', direction: 'desc' }],
      })
      .eachPage((records, fetchNextPage) => {
        const counties = data && data.counties ? [...data.counties] : [];
        let totalCases = !!data.cases ? data.cases.total : 0,
          totalCures = !!data.cures ? data.cures.total : 0,
          totalDeaths = !!data.deaths ? data.deaths.total : 0;

        let todayCases = !!data.cases ? data.cases.today : 0,
          todayCures = !!data.cures ? data.cures.today : 0,
          todayDeaths = !!data.deaths ? data.deaths.today : 0;

        records.forEach(record => {
          counties.push(record.fields);

          totalCases += record.fields['total cases'];
          totalCures += record.fields['total cures'];
          totalDeaths += record.fields['total deaths'];

          todayCases += record.fields['today cases'];
          todayCures += record.fields['today cures'];
          todayDeaths += record.fields['today deaths'];
        });

        setData({
          counties: counties,
          updatedAt: counties[0]['last update'],
          cases: { total: totalCases, today: todayCases },
          cures: { total: totalCures, today: todayCures },
          deaths: { total: totalDeaths, today: todayDeaths },
        });

        fetchNextPage();
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
