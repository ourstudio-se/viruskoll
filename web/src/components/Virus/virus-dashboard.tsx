import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useVirusLoader from './useVirusLoader';
import { Coordinates, InitialMapOptions, Bounds, VirusPayload } from '../../@types/virus';
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
import DataBox from '../DataBox';
import Snackbar from '../Snackbar';
import Link from '../Link';
import { ColumnRow, ColumnRowItem } from '../ColumnRow';
import { Button } from '../Button';
import { IconGear } from '../Icon';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { TextLight } from '../TextDecoration';
import { H1, H3 } from '../Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import { TrackView } from '../../utils/tracking';
import MapSearch from '../location/map-search';
import { Organization } from '../../@types/organization';


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

interface VirusDashboard {
  organization?: Organization | null;
  organizationId?: string;
  onShowSettings?: () => void;
}

const VirusDashboard = ({
  organization,
  organizationId,
  onShowSettings,
}: VirusDashboard): JSX.Element => {
  const { t } = useTranslation();
  const [location, setLocation] = React.useState<google.maps.LatLng | undefined>()
  const [mapState, setMapState] = React.useState<MapState | undefined>();

  React.useEffect(() => {
    TrackView()
  }, []);

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

  const onLocationSelect = (location: google.maps.LatLng) => setLocation(location);

  const onMapUpdate = React.useCallback(
    (bounds: Bounds, zoom: number) => setMapState({ bounds, zoom }), []);

  const { data } = useVirusLoader(payload, organizationId);

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
        <Map initialOptions={initialOptions} location={location} data={data} onMapUpdate={onMapUpdate} />
      </DashboardMap>
      <DashboardContent>
        <DashboardContentBody>
        <Container>
          <Repeat large>
            {organization && (
              <Repeat>
                <ColumnRow>
                  <ColumnRowItem>
                    <H1 noMargin autoBreak>{organization.name}</H1>
                  </ColumnRowItem>
                  <ColumnRowItem>
                    <Button small title="Inställningar" onClick={onShowSettings}>
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
                      <p>Sök efter en plats och/eller dra i kartan för att specifiera området datan visas för.</p>
                    </Content>
                  </TextLight>
                </Repeat>
              </>
            )}
          </Repeat>

          {data && data.count === 0 && (
            <Repeat large>
              <Repeat>
                <Snackbar
                  severity="error"
                  heading="Ingen data"
                  icon={true}
                >
                  Det finns ingen data för den angivna platsen.
                </Snackbar>
              </Repeat>
            </Repeat>
          )}

          {data && data.healthy && data.healthy.length > 0 &&(
            <Repeat large>
              <DataBoxGrid>
                <RepeatList healthList={data.healthy} count={data.count} />
                {data.count && (
                  <DataBoxGridItem>
                    <DataBox
                      label={t('hasSymptoms')}
                      value={`${((data.count - healthy)/data.count * 100).toFixed(1)}%`}
                      subValue={data ? numberSeparator(data.count - healthy) : '-'}

                    />
                  </DataBoxGridItem>
                )}
              </DataBoxGrid>
            </Repeat>
          )}
          {data && data.unhealthy && data.unhealthy.length > 0 && (
            <Repeat large>
              <H3>De med symptom har:</H3>
              <DataBoxGrid>
                <RepeatList healthList={data.unhealthy} count={data.count} />
              </DataBoxGrid>
            </Repeat>
          )}
          {data && data.workingSituations && data.workingSituations.length > 0 && (
            <Repeat large>
              <H3>Arbetssituation:</H3>
              <DataBoxGrid>
                <RepeatList healthList={data.workingSituations} count={data.count} />
              </DataBoxGrid>
            </Repeat>
          )}

          <Repeat large>
            <Content textCenter>
              <p>Hjälp oss förbättra datan genom att <Link to="/join">registrera dig</Link>. Du kan läsa mer om hur du kan hjälpa oss <Link to="/about">här</Link>.</p>
            </Content>
          </Repeat>
        </Container>
        </DashboardContentBody>
        {organization && (
          <DashboardContentFooter>
            <Container>
              <Button
                fullWidth
                action=""
              >
                Registera dig i detta företag
              </Button>
            </Container>
          </DashboardContentFooter>
        )}
      </DashboardContent>
      {/*
      <Modal
        title="Inställningar"
        footer={(
        <ActionGroup>
          <Action>
            <Button fullWidth outline title="Avbryt">
              Avbryt
            </Button>
          </Action>
          <Action>
            <Button fullWidth title="Spara" disabled>
              Spara
            </Button>
          </Action>
        </ActionGroup>
      )}
      >
        <Repeat>
          <InputText
            label="Företagets namn"
            placeholder="Företagets namn"
            id="join-org-name"
            name="name"
            value="Our Studio"
          />
        </Repeat>
        <Repeat>
          <Repeat>
            <SearchSuggestion
              label="Lägg till kontor"
              description="Ange kontorets adress."
              action="Lägg till"
              placeholder="Sök plats..."
            />
          </Repeat>
          <Repeat>
            Lista med kontor...
          </Repeat>
        </Repeat>
      </Modal>
      */}

    </Dashboard>
  );
};

export default VirusDashboard;
