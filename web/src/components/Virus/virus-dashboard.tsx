import * as React from 'react';

import {
  Bounds,
  GoogleMapSettings,
  ModalLayerData,
  DataSource,
} from '../../@types/virus';
import Map from './map';

import {
  Dashboard,
  DashboardMap,
  DashboardContent,
  DashboardContentUiBlock,
  DashboardContentTray,
  DashboardContentHeader,
  DashboardContentBody,
  DashboardFooter,
  HeaderHeading,
  HeaderAction,
  CloseBtn,
} from '../Dashboard';
import Container from '../Container';
import Repeat from '../Repeat';
import Content from '../Content';
import Link from '../Link';
// import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import { Button } from '../Button';
import { IconCancel } from '../Icon';
import DataDisplay from './data-display';
import useVirusLoader from './data-loaders/useVirusLoader';
import useGeoLoader from './data-loaders/useGeoLoader';
import MapInfoContainer from './map-info-container';

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

const VirusDashboard = (): JSX.Element => {
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

  const { data } = useVirusLoader(zoom);
  const { layer } = useGeoLoader(zoom);
  const title = React.useMemo(
    () => (layerInformation ? layerInformation.name : 'Hela Sverige'),
    [layerInformation]
  );

  const dataSource = React.useMemo((): DataSource => layerInformation || data, [
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
        <MapInfoContainer />
      </DashboardMap>
      <DashboardContent
        className={
          displayMobileStats || layerInformation ? 'is-visible' : undefined
        }
      >
        <DashboardContentUiBlock onClick={onCloseModal} title="Stäng" />
        <DashboardContentTray>
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
              {dataSource && (
                <Repeat large>
                  <DataDisplay data={dataSource} />
                </Repeat>
              )}
              <Repeat large>
                <Content textCenter>
                  <p>
                    Hjälp oss förbättra datan genom att{' '}
                    <Link to="/join">registrera dig</Link>. Du kan läsa mer om
                    hur Viruskoll fungerar <Link to="/about">här</Link>.
                  </p>
                </Content>
              </Repeat>
            </Container>
          </DashboardContentBody>
        </DashboardContentTray>
      </DashboardContent>
      <DashboardFooter>
        <Button
          fullWidth
          title="Visa data för hela Sverige"
          onClick={onOpenMobileStatsDisplay}
        >
          Visa data för hela Sverige
        </Button>
        {/*<ColumnRow>
          <ColumnRowItem fillWidth>
            <Button
              fullWidth
              title="Visa data för hela Sverige"
              onClick={onOpenMobileStatsDisplay}
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
        </ColumnRow>*/}
      </DashboardFooter>
    </Dashboard>
  );
};

export default VirusDashboard;
