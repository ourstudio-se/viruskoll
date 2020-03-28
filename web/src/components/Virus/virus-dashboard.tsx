import * as React from 'react';

import useVirusLoader from './useVirusLoader';
import { Bounds, VirusPayload, GoogleMapSettings } from '../../@types/virus';
import Map from './map';

import {
  Dashboard,
  DashboardMap,
  DashboardContent,
  DashboardContentBody,
  DashboardContentFooter,
} from '../Dashboard';
import Container from '../Container';
import Repeat from '../Repeat';
import Content from '../Content';
import Link from '../Link';
import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import { Button } from '../Button';
import { IconGear } from '../Icon';
import { TextLight } from '../TextDecoration';
import { H1 } from '../Heading';
import MapSearch from '../location/map-search';
import { Organization } from '../../@types/organization';
import useGeoLoader from './useGeoLoader';
import DataDisplay from './data-display';
import DataDisplayHover from './data-display-hover';

const initialCoordinates: google.maps.LatLngLiteral = {
  lat: 63.176683,
  lng: 14.636068,
};

const initialOptions: GoogleMapSettings = {
  location: initialCoordinates,
  zoom: window.innerHeight > 800 ? 5 : 4,
};

interface MapState {
  bounds: Bounds;
  zoom: number;
}

interface VirusDashboard {
  organization?: Organization | null;
  organizationId?: string;
  onShowSettings?: () => void;
  onShowRegisterModal?: () => void;
}

const VirusDashboard = ({
  organization,
  organizationId,
  onShowSettings,
  onShowRegisterModal,
}: VirusDashboard): JSX.Element => {
  const [mapSettings, setMapSettings] = React.useState<GoogleMapSettings>(
    initialOptions
  );
  const [mapState, setMapState] = React.useState<MapState | undefined>();
  const [dataHover, setDataHover] = React.useState();

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

  const onLocationSelect = React.useCallback(
    (nextLocation: google.maps.LatLng) => {
      const location = {
        lat: nextLocation.lat(),
        lng: nextLocation.lng(),
      };
      setMapSettings({ location, zoom: 8 });
    },
    []
  );

  const onMapUpdate = React.useCallback(
    (bounds: Bounds, zoom: number) => setMapState({ bounds, zoom }),
    []
  );

  const { data } = useVirusLoader(payload, organizationId);
  const { layer } = useGeoLoader(mapState ? mapState.zoom : mapSettings.zoom);

  return (
    <Dashboard>
      <DashboardMap>
        <Map
          mapSettings={mapSettings}
          data={data}
          layer={layer}
          onMapUpdate={onMapUpdate}
          setDataHover={setDataHover}
        />
      </DashboardMap>
      <DashboardContent>
        <DashboardContentBody>
          <Container>
            <Repeat large>
              {organization && (
                <Repeat>
                  <ColumnRow>
                    <ColumnRowItem>
                      <H1 noMargin autoBreak>
                        {organization.name}
                      </H1>
                    </ColumnRowItem>
                    <ColumnRowItem>
                      <Button
                        small
                        title="Inställningar"
                        onClick={onShowSettings}
                      >
                        <IconGear block />
                      </Button>
                    </ColumnRowItem>
                  </ColumnRow>
                </Repeat>
              )}
              {!organization && (
                <>
                  <Repeat small>
                    <MapSearch onLocationSelect={onLocationSelect} />
                  </Repeat>
                  <Repeat small>
                    <TextLight>
                      <Content>
                        <p>
                          Sök efter en plats och/eller dra i kartan för att
                          specifiera området datan visas för.
                        </p>
                      </Content>
                    </TextLight>
                  </Repeat>
                </>
              )}
            </Repeat>
            <DataDisplay data={data} />

            {dataHover && (
              <Repeat large>
                <DataDisplayHover data={dataHover} />
              </Repeat>
            )}

            <Repeat large>
              <Content textCenter>
                <p>
                  Hjälp oss förbättra datan genom att{' '}
                  <Link to="/join">registrera dig</Link>. Du kan läsa mer om hur
                  du kan hjälpa oss <Link to="/about">här</Link>.
                </p>
              </Content>
            </Repeat>
          </Container>
        </DashboardContentBody>
        {organization && (
          <DashboardContentFooter>
            <Container>
              <Button fullWidth action="" onClick={onShowRegisterModal}>
                Registera dig i detta företag
              </Button>
            </Container>
          </DashboardContentFooter>
        )}
      </DashboardContent>
    </Dashboard>
  );
};

export default VirusDashboard;
