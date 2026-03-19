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
    let updatedParams = params;

    if (params.data.image
        && params.data.image.rawFile
        && params.data.image.src.indexOf('blob:') > -1
    ) {
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
        updatedParams.data.image.src = publicUrl;

        updatedParams = {
            ...updatedParams,
            data: {
                ...updatedParams.data,
                image_url: publicUrl,
            },
        };
    }

    if (params.data.galleries && params.data.galleries.length > 0) {
        const galleryPublicUrls: string[] = [];
        const galleryFiles = params.data.galleries;
        const uploadPromises = [];
        const publicUrlPromises = [];

        for (let i = 0; i < galleryFiles.length; i++) {
            const galleryFile = galleryFiles[i];
            const galleryRawFile = galleryFile.rawFile;

            if (galleryRawFile && galleryFile.src.indexOf('blob:') > -1) {
                const galleryRawPath = `${Date.now()}-${galleryRawFile.name}`;
                uploadPromises[i] = supabaseClient.storage.from('estate').upload(galleryRawPath, galleryRawFile);
                publicUrlPromises[i] = supabaseClient.storage.from('estate').getPublicUrl(galleryRawPath);
            }
        }

        await Promise.all(uploadPromises).catch((error) => {
            console.error(error.message);
        });

        await Promise.all(publicUrlPromises).then((objUrls) => {
            for (const key in objUrls) {
                if (objUrls[key] && objUrls[key].data) {
                    updatedParams.data.galleries[key].src = objUrls[key].data.publicUrl;
                }
            }
        }).catch((error) => {
            console.error(error.message);
        });

        updatedParams.data.galleries.forEach((item: any) => {
            galleryPublicUrls.push(item.src);
        });

        updatedParams = {
            ...updatedParams,
            data: {
                ...updatedParams.data,
                gallery_urls: galleryPublicUrls,
            },
        };
    }
    
    return updatedParams;
}

const myDataProvider = {
    ...dataProvider,
    create: async (resource: any, params: any) => {
        if (resource === 'property' && (
                params.data.image ||
                params.data.galleries && params.data.galleries.length > 0
            )
        ) {
            const updatedParams = await addImageParams(params);

            return dataProvider.create(resource, updatedParams);
        }

        return dataProvider.create(resource, params);
    },
    update: async (resource: any, params: any) => {
        if (resource === 'property' && (
                params.data.image ||
                params.data.galleries && params.data.galleries.length > 0
            )
        ) {
            const updatedParams = await addImageParams(params);

            return dataProvider.update(resource, updatedParams);
        }

        return dataProvider.update(resource, params);
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
