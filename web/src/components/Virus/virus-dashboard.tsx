import * as React from 'react';

import { Bounds, GoogleMapSettings, ModalLayerData } from '../../@types/virus';
import Map from './map';

import {
  Dashboard,
  DashboardMap,
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
import { IconGear, IconCancel } from '../Icon';
import { H1 } from '../Heading';
import { Organization } from '../../@types/organization';
import DataDisplay from './data-display';
import useVirusLoader from './data-loaders/useVirusLoader';
import useGeoLoader from './data-loaders/useGeoLoader';
// import MapInfoContainer from './map-info-container';

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
  const [displayMobileStats, setDisplayMobileStats] = React.useState(false);
  const [layerInformation, setLayerInformation] = React.useState<
    ModalLayerData | undefined
  >();

  const onMapUpdate = React.useCallback(
    (bounds: Bounds, zoom: number) => setMapState({ bounds, zoom }),
    []
  );

  const onOpenMobileStatsDisplay = React.useCallback(
    () => setDisplayMobileStats(true),
    []
  );
  const onCloseModal = React.useCallback(() => {
    setDisplayMobileStats(false);
    setLayerInformation(undefined);
  }, []);

  const zoom = React.useMemo(() => {
    const z = mapState?.zoom || initialOptions.zoom;
    if (z < 9) {
      return 6;
    }
    return 22;
  }, [mapState]);

  const { data } = useVirusLoader(zoom, organizationId);
  const { layer } = useGeoLoader(zoom);
  const title = layerInformation ? layerInformation.name : 'Hela Sverige';

  const dataSource = React.useMemo(() => layerInformation || data, [
    layerInformation,
    data,
  ]);

  return (
    <Dashboard>
      <DashboardMap>
        <Map
          mapSettings={initialOptions}
          data={data}
          layer={layer}
          onMapUpdate={onMapUpdate}
          setLayerInformation={setLayerInformation}
        />
        {/*<MapInfoContainer />*/}
      </DashboardMap>
      <DashboardContent
        className={
          displayMobileStats || layerInformation ? 'is-visible' : undefined
        }
      >
        <DashboardContentHeader>
          <HeaderHeading>{title}</HeaderHeading>
          <HeaderAction>
            <CloseBtn title="Stäng" onClick={onCloseModal}>
              <IconCancel block />
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
            {dataSource && (
              <Repeat large>
                <DataDisplay data={dataSource} />
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
              title="Visa data för hela Sverige"
              onClick={onOpenMobileStatsDisplay}
            >
              Visa data för hela Sverige
            </Button>
          </ColumnRowItem>
          {/*<ColumnRowItem>
            <Button
              outline
              square
              title="Inställningar"
              onClick={onShowSettings}
            >
              <IconGear block />
            </Button>
          </ColumnRowItem>*/}
        </ColumnRow>
      </DashboardFooter>
    </Dashboard>
  );
};

export default VirusDashboard;
