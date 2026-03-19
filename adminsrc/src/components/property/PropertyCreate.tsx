import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    RadioButtonGroupInput,
    NumberInput,
    ImageInput,
    ImageField,
    required
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Stack } from '@mui/material';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const PropertyCreate = () => {
    return (
        <div>
            <h2>Create New Property</h2>
            <Create disableAuthentication>
                <SimpleForm toolbar={<FormActionToolbar />}>
                    <TextInput source="title" validate={required()} />
                    <ReferenceInput label="Listing Type" source="listing_type_id" reference="listingType">
                        <RadioButtonGroupInput optionText="name" />
                    </ReferenceInput>
                    <ImageInput source="image" multiple={false}>
                        <ImageField source="src" />
                    </ImageInput>
                    <ImageInput source="galleries" multiple={true}>
                        <ImageField source="src" />
                    </ImageInput>
                    <Stack direction={'row'} spacing={2}>
                        <ReferenceInput label="Location" source="location_id" reference="location">
                            <SelectInput optionText="name" optionValue="id" validate={required()} />
                        </ReferenceInput>
                        <ReferenceInput label="Property Type" source="property_type_id" reference="propertyType">
                            <SelectInput optionText="name" optionValue="id" validate={required()} />
                        </ReferenceInput>
                    </Stack>
                    <TextInput source="address" />
                    <Stack direction={'row'} spacing={2}>
                        <NumberInput source="bed" />
                        <NumberInput source="bath" />
                        <NumberInput source="park" />
                        <TextInput source="square" />
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                        <TextInput source="median_price" />
                        <TextInput source="median_rent" />
                    </Stack>

                    <RichTextInput source="description" />
                    <BooleanInput source="actived" defaultValue={true} />
                </SimpleForm>
            </Create>
        </div>
    )
};