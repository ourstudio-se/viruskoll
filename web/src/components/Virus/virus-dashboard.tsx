import * as React from 'react';

import { Bounds, GoogleMapSettings } from '../../@types/virus';
import Map from './map';

import {
  Dashboard,
  DashboardMap,
  DashboardContent,
  DashboardContentBody,
  DashboardContentFooter,
  DashboardFooter,
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
import DataDisplay from './data-display';
import DataDisplayHover from './data-display-hover';
import useVirusLoader from './data-loaders/useVirusLoader';
import useGeoLoader from './data-loaders/useGeoLoader';

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

  const zoom = React.useMemo(() => {
    const z = mapState?.zoom || initialOptions.zoom;
    if (z < 9) {
      return 6;
    }
    return 22;
  }, [mapState]);

  const { data } = useVirusLoader(zoom, organizationId);
  const { layer } = useGeoLoader(zoom);

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
            {!dataHover && (
              <Repeat large>
                <DataDisplay data={data} />
              </Repeat>
            )}

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
      <DashboardFooter>
        Footer
      </DashboardFooter>
    </Dashboard>
  );
};

export default VirusDashboard;
