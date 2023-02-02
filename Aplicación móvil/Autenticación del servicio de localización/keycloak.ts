import { RNKeycloak } from '@react-keycloak/native';

// Setup Keycloak instance as needed
// Pass initialization options as required
const keycloak = new RNKeycloak({
    "realm": "pagoda-posicionamiento",
    "url" : "https://138.4.7.173:80/",
    "clientId": "app-posicionamiento"
}   
);

export default keycloak;
