import React from 'react';
import Content from '../Content';
import LinkExternal from '../LinkExternal';

const GdprContent = () => (
  <Content fullWidth>
    <h2>De viktigaste punkternavi gårigenom i denna policy:</h2>
    <ul>
      <li>Vilka personuppgifter Viruskollsamlar in;</li>
      <li>Varför Viruskollsamlar in personuppgifterna ifråga;</li>
      <li>Hur Viruskoll avser använda insamlade personuppgifter samt hur lagring och gallring sker;</li>
      <li>Vilka rättigheter du som registrerad har, till exempel gällande åtkomst och rättelse av personuppgifter;</li>
    </ul>

    <h3>Vilka personuppgifter samlar vi in om dig:</h3>
    <p>Vi behöver spara och behandla personuppgifter om dig, det vi sparar är din e-postadress, din/dina positioners namn, samtde loggardu delar med oss kring arbetssituation och symptom.</p>

    <h3>Varför samlar vi indessa personuppgifterom dig:</h3>
    <p>Syftet med lagringen av e-postadressenär för att kunna skicka e-post till dig för attdu ska kunna svara på frågorna som bygger tjänsten, övriga personuppgifter sparas för att kunna visa ett underlagpå många människors situationför allmänheten som dock presenterashelt anonymiserat.</p>

    <h3>Hur har vi fått tag i dina personuppgifteroch hur genomför vi gallring:</h3>
    <p>Vi har fått alla dinapersonuppgifterfrån dig. Vi tillämpar vid var tid gällande integritetslagstiftning vid all behandling av personuppgifter. Dina uppgifter kommer att sparas så länge du använder tjänsten och maximalt i tre månader efter det.</p>

    <h3>I vilka fall kommer vi dela med oss av dina personuppgifter:</h3>
    <p>De personuppgifter vi behandlarom dig delas inte med någonom vi inte blir skyldiga att göra så enligt lag. Vi kommer aldrig att överföra dina uppgifter till ett land utanför EU.</p>

    <h3>Vem har Personuppgiftsansvarför dininformation:</h3>
    <p>Personuppgiftsansvarig står Our Studio Void AB för(org nr 556780-8455).</p>

    <h3>Vilka rättigheter har du:</h3>
    <p>Duhar rätt att kontakta oss på <LinkExternal href="mailto:gdpr@ourtsudio.se" title="Maila oss">gdpr@ourtsudio.se</LinkExternal> om du vill ha ut information om de uppgifter vi har om dig, för att begära rättelse, överföring eller för att begära att vi begränsar behandlingen, för att göra invändningarellerbegära radering avdina uppgifter. Om du har klagomålpåvår behandling av dina personuppgifter har du rätt att inge klagomål till tillsynsmyndigheten Datainspektionen.</p>

    <h3>Vilka har tillgång till dina personuppgifter:</h3>
    <p>Vi visar ingen statistik på ett urval om detta urval inte består av minst 3 personer. Ingen användare av tjänsten vet vilken användare som rapporterat vilken information.</p>

    <h3>Epostkommunikationfrån Viruskoll:</h3>
    <p>Vi skickar regelbundet mail till alla aktiva användare för att de ska rapportera sin status, det går i varje mail från oss att avregistrera sig från alla mail.</p>

    <h3>Cookies:</h3>
    <p>Vi sparar cookies för att analysera vår trafik, vi sparar inga personuppgifter i dessa kakor. Du kan läsa mer om Cookies här -> <LinkExternal href="https://sv.wikipedia.org/wiki/Webbkaka" target="_blank" rel="noopener noreferrer">https://sv.wikipedia.org/wiki/Webbkaka</LinkExternal> </p>

  </Content>
);

export default GdprContent;