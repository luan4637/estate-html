import { 
    Admin,
    Resource
} from 'react-admin';
import { HashRouter } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import {
    defaultI18nProvider,
    supabaseDataProvider,
    supabaseAuthProvider
} from 'ra-supabase';   

import { GpsFixed, MapsHomeWork, LocalOffer, Bookmark } from '@mui/icons-material';

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

const addImageParams = async (params: any) => {
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
    let objImg = params.data.image;
    objImg.src = publicUrl;

    const updatedParams = {
        ...params,
        data: {
            ...params.data,
            image_url: publicUrl,
            image: objImg,
        },
    };
    
    return updatedParams;
}

const myDataProvider = {
    ...dataProvider,
    create: async (resource: any, params: any) => {
        if (resource !== 'property' || !params.data.image || params.data.image.length === 0 || typeof params.data.image.rawFile === 'undefined') {
            return dataProvider.create(resource, params);
        }

        const updatedParams = await addImageParams(params);

        return dataProvider.create(resource, updatedParams);
    },
    update: async (resource: any, params: any) => {
        if (resource !== 'property' || !params.data.image || params.data.image.length === 0 || typeof params.data.image.rawFile === 'undefined') {
            return dataProvider.update(resource, params);
        }

        const updatedParams = await addImageParams(params);

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
            <Resource icon={MapsHomeWork} name="property" list={PropertyList} edit={PropertyEdit} create={PropertyCreate} />
            <Resource icon={GpsFixed} name="location" list={LocationList} edit={LocationEdit} create={LocationCreate} />
            <Resource icon={Bookmark} name="propertyType" list={PropertyTypeList} edit={PropertyTypeEdit} create={PropertyTypeCreate} />
            <Resource icon={LocalOffer} name="listingType" list={ListingTypeList}  />
        </Admin>
    </HashRouter>
);
