import { 
    Admin,
    Resource,
    CustomRoutes,
    ListGuesser,
    ShowGuesser,
    EditGuesser
} from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
    CreateGuesser,
    ForgotPasswordPage,
    LoginPage,
    SetPasswordPage,
    defaultI18nProvider,
    supabaseDataProvider,
    supabaseAuthProvider
} from 'ra-supabase';   

import { LocationList, LocationEdit, LocationCreate } from './components/location';

const instanceUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

export const App = () => (
    <BrowserRouter>
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={LoginPage}
        >
            <Resource name="location" list={LocationList} edit={LocationEdit} create={LocationCreate} />
            {/* <Resource name="property" list={ListGuesser} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="propertyType" list={ListGuesser} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <Resource name="listingType" list={ListGuesser} edit={EditGuesser} create={CreateGuesser} show={ShowGuesser} />
            <CustomRoutes>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
            </CustomRoutes> */}
        </Admin>
    </BrowserRouter>
);
