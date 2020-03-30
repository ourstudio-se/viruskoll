import * as React from 'react';

import { Bounds, GoogleMapSettings } from '../../@types/virus';
import Map from './map';

import {
  Dashboard,
  DashboardMap,
  MapInfo,
  DashboardContent,
  DashboardContentHeader,
  DashboardContentBody,
  DashboardContentFooter,
  DashboardFooter,
  HeaderHeading,
  HeaderAction,
  CloseBtn,
} from '../Dashboard';
import Container from '../Container';
import Repeat from '../Repeat';
import Content from '../Content';
import Link from '../Link';
import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import { Button } from '../Button';
import { IconGear, IconInfo, IconCheck } from '../Icon';
import { H1 } from '../Heading';
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
  const [mapState, setMapState] = React.useState<MapState | undefined>();
  const [dataHover, setDataHover] = React.useState();

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
          mapSettings={initialOptions}
          data={data}
          layer={layer}
          onMapUpdate={onMapUpdate}
          setDataHover={setDataHover}
        />
        <MapInfo>
          <IconInfo block />
        </MapInfo>
      </DashboardMap>
      <DashboardContent>
        <DashboardContentHeader>
          <HeaderHeading>Heading</HeaderHeading>
          <HeaderAction>
            <CloseBtn title="Stäng">
              <IconCheck block />
            </CloseBtn>
          </HeaderAction>
        </DashboardContentHeader>
        <DashboardContentBody>
          <Container>
            {organization && (
              <Repeat large>
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
        <ColumnRow>
          <ColumnRowItem fillWidth>
            <Button
              fullWidth
              title="Inställningar"
              onClick={onShowRegisterModal}
            >
              Visa data för hela Sverige
            </Button>
          </ColumnRowItem>
          <ColumnRowItem>
            <Button
              outline
              square
              title="Inställningar"
              onClick={onShowSettings}
            >
              <IconGear block />
            </Button>
          </ColumnRowItem>
        </ColumnRow>
      </DashboardFooter>
    </Dashboard>
  );
};

export default VirusDashboard;
