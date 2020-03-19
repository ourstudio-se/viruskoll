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
  DashboardContentBody,
  DashboardContentFooter,
} from '../../components/Dashboard';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';
import Content from '../../components/Content';
import DataBox from '../../components/DataBox';
import Snackbar from '../../components/Snackbar';
import Modal from '../../components/Modal';
import { ActionGroup, Action } from '../../components/Modal/wrapper';
import InputSearch from '../../components/InputSearch';
import { ColumnRow, ColumnRowItem } from '../../components/ColumnRow';
import { Button } from '../../components/Button';
import { IconGear } from '../../components/Icon';
import { DataBoxGrid, DataBoxGridItem } from '../../components/DataBoxGrid';
import { TextLight } from '../../components/TextDecoration';
import { H1, H3 } from '../../components/Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import { TrackView } from '../../utils/tracking';

import SearchSuggestion from '../../components/location/search-suggestion';
import InputText from '../../components/InputText';

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
        <Map initialOptions={initialOptions} data={data} onMapUpdate={onMapUpdate} />
      </DashboardMap>
      <DashboardContent>
        <DashboardContentBody>
        <Container>
          <Repeat large>
            <Repeat>
              <ColumnRow>
                <ColumnRowItem>
                  <H1 noMargin autoBreak>Our Studio</H1>
                </ColumnRowItem>
                <ColumnRowItem>
                  <Button small title="Inställningar">
                    <IconGear block />
                  </Button>
                </ColumnRowItem>
              </ColumnRow>
            </Repeat>
            <Repeat small>
              <InputSearch
                placeholder="Sök plats..."
                id="map-search"
              />
            </Repeat>
            <Repeat small>
              <TextLight>
                <Content>
                  <p>Sök efter en plats och/eller dra i kartan för att specifiera området datan visas för.</p>
                </Content>
              </TextLight>
            </Repeat>
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
              <Repeat>
                Hjälp oss förbättra datan genom att registrera dig.
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
        </Container>
        </DashboardContentBody>
        <DashboardContentFooter>
          <Container>
            <Button
              fullWidth
              action
            >
              Registera dig i detta företag
            </Button>
          </Container>
        </DashboardContentFooter>
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

export default withRouter(Home);
