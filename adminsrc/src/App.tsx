import { 
    Admin,
    Resource,
    CustomRoutes,
    ListGuesser,
    ShowGuesser,
    EditGuesser
} from 'react-admin';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
    CreateGuesser,
    ForgotPasswordPage,
    // LoginPage,
    SetPasswordPage,
    defaultI18nProvider,
    supabaseDataProvider,
    supabaseAuthProvider
} from 'ra-supabase';   

import { PropertyList, PropertyEdit, PropertyCreate } from './components/property';
import { LocationList, LocationEdit, LocationCreate } from './components/location';
import { PropertyTypeList, PropertyTypeEdit, PropertyTypeCreate } from './components/propertyType';
import { ListingTypeList } from './components/listingType';
import { LoginPage } from './pages/LoginPage';


const instanceUrl = import.meta.env.VITE_SUPABASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabaseClient = createClient(instanceUrl, apiKey);
const dataProvider = supabaseDataProvider({ instanceUrl, apiKey, supabaseClient });
const authProvider = supabaseAuthProvider(supabaseClient, {});

const myDataProvider = {
    ...dataProvider,
    update: async (resource: any, params: any) => {
        if (resource !== 'property' || !params.data.image || params.data.image.length === 0 || typeof params.data.image.rawFile === 'undefined') {
            return dataProvider.update(resource, params);
        }

        const file = params.data.image.rawFile;
        const filePath = `${Date.now()}-${file.name}`;

        const { data: uploadData, error: uploadError } = await supabaseClient.storage
            .from('estate')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type || 'image/jpeg',
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error('Image upload failed');
        }

        const { data: publicURLData } = supabaseClient.storage
            .from('estate')
            .getPublicUrl(filePath);

        const publicUrl = publicURLData.publicUrl;

        const updatedParams = {
            ...params,
            data: {
                ...params.data,
                image_url: publicUrl,
                image: undefined,
            },
        };

        return dataProvider.update(resource, updatedParams);
    },
};


export const App = () => (
    <HashRouter /*basename="/admin"*/>
        <Admin
            dataProvider={myDataProvider}
            authProvider={authProvider}
            i18nProvider={defaultI18nProvider}
            loginPage={LoginPage}
        >
            <Resource name="property" list={PropertyList} edit={PropertyEdit} create={PropertyCreate} />
            <Resource name="location" list={LocationList} edit={LocationEdit} create={LocationCreate} />
            <Resource name="propertyType" list={PropertyTypeList} edit={PropertyTypeEdit} create={PropertyTypeCreate} />
            <Resource name="listingType" list={ListingTypeList}  />
            {/* <CustomRoutes>
                <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
                <Route path={ForgotPasswordPage.path} element={<ForgotPasswordPage />} />
            </CustomRoutes> */}
        </Admin>
    </HashRouter>
);
