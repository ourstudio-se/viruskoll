import * as React from 'react';
import { withRouter } from 'react-router-dom';

import useVirusLoader, { VirusPayload } from './useVirusLoader';
import { ICoordinates, InitialMapOptions, Bounds } from './models';
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

const initialCoordinates: ICoordinates = {
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

const Home = () => {
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
          <Repeat large>
            <Repeat small>
              <DataBox
                label="Personer"
                value={data ? numberSeparator(data.count) : '-'}
              />
            </Repeat>
            <Repeat small>
              <DataBox
                label="Friska"
                value="78 %"
                subValue={data ? numberSeparator(data.noSymptoms) : '-'}
              />
            </Repeat>
            <Repeat small>
              <DataBox
                label="Har symptom"
                value="22 %"
                subValue={data ? numberSeparator(data.withSymptoms) : '-'}
              />
            </Repeat>
          </Repeat>
          <Repeat large>
            <H3>De med symptom har:</H3>
            <Repeat small>
              <DataBox
                label="Feber"
                value="33 %"
                subValue="1 734"
              />
            </Repeat>
            <Repeat small>
              <DataBox
                label="Hosta"
                value="54 %"
                subValue="2 034"
              />
            </Repeat>
            <Repeat small>
              <DataBox
                label="Snuva"
                value="69 %"
                subValue="3 065"
              />
            </Repeat>
          </Repeat>
          <Repeat large>
            <H3>Arbetssituation:</H3>
            <Repeat small>
              <DataBox
                label="Arbetar"
                value="12 %"
                subValue="2 398"
              />
            </Repeat>
            <Repeat small>
              <DataBox
                label="Vabbar"
                value="12 %"
                subValue="2 398"
              />
            </Repeat>
            <Repeat small>
              <DataBox
                label="Arbetar hemifrån"
                value="12 %"
                subValue="2 398"
              />
            </Repeat>
          </Repeat>
        </Container>
      </DashboardContent>
    </Dashboard>
  );
};

export default withRouter(Home);
