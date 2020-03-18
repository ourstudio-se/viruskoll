import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useVirusLoader, { VirusPayload } from './useVirusLoader';
import { Coordinates, InitialMapOptions, Bounds } from './models';
import Map from './map';

import {
  Dashboard,
  DashboardMap,
  DashboardContent,
} from '../../components/Dashboard';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';
import Content from '../../components/Content';
import DataBox from '../../components/DataBox';
import { TextLight } from '../../components/TextDecoration';
import { H1, H3 } from '../../components/Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';

const initialCoordinates: Coordinates = {
  lat: 57.6724373,
  lng: 12.1083129,
};

const initialOptions: InitialMapOptions = {
  center: initialCoordinates,
  zoom: 8,
};

interface MapState {
  bounds: Bounds;
  zoom: number;
}

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const [mapState, setMapState] = React.useState<MapState | undefined>();
  const payload: VirusPayload | undefined = React.useMemo(() => {
    if (!mapState) {
      return undefined;
    }

    return {
      precision: mapState.zoom,
      sw: mapState.bounds.sw,
      ne: mapState.bounds.ne,
    };
  }, [mapState]);

  const onMapUpdate = React.useCallback(
    (bounds: Bounds, zoom: number) => setMapState({ bounds, zoom }), []);

  const { data } = useVirusLoader(payload);

  const healthy = React.useMemo(() => {
    if (!data || !data.healthy) {
      return null;
    }
    return data.healthy.reduce((prev, cur) => {
      const next = prev + cur.count
      return next;
    }, 0)
  }, [data])

  return (
    <Dashboard>
      <DashboardMap>
        <Map initialOptions={initialOptions} onMapUpdate={onMapUpdate} />
      </DashboardMap>
      <DashboardContent>
        <Container>
          <Repeat large>
            <H1>Karta</H1>
            <TextLight>
              <Content>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam nibh. Nunc varius facilisis eros. Sed erat.</p>
              </Content>
            </TextLight>
          </Repeat>
          {data && data.healthy && data.healthy.length > 0 &&(
            <Repeat large>
              <RepeatList healthList={data.healthy} count={data.count} />
              {data.count && (
                <Repeat small>
                  <DataBox
                    label={t('hasSymptoms')}
                    value={`${((data.count - healthy)/data.count * 100).toFixed(1)}%`}
                    subValue={data ? numberSeparator(data.count - healthy) : '-'}
                    
                  />
                </Repeat>
              )}
            </Repeat>
          )}
          {data && data.unhealthy && data.unhealthy.length > 0 && (
            <Repeat large>
              <H3>De med symptom har:</H3>
              <RepeatList healthList={data.unhealthy} count={data.count} />
            </Repeat>
          )}
          {data && data.workingSituations && data.workingSituations.length > 0 && (
            <Repeat large>
              <H3>Arbetssituation:</H3>
              <RepeatList healthList={data.workingSituations} count={data.count} />
            </Repeat>
          )}
        </Container>
      </DashboardContent>
    </Dashboard>
  );
};

export default withRouter(Home);
