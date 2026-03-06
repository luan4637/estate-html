import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    DateInput,
    ReferenceInput,
    SelectInput,
    RadioButtonGroupInput,
    NumberInput,
    AutocompleteInput,
    ImageInput,
    ImageField,
    required
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import { Stack } from '@mui/material';

import { FormActionToolbar } from '../common/FormActionToolbar';

export const PropertyEdit = () => {
    return (
        <div>
            <h2>Editing Property</h2>
            <Edit>
                <SimpleForm toolbar={<FormActionToolbar />}>
                    <TextInput source="title" validate={required()} />
                    <ReferenceInput label="Listing Type" source="listing_type_id" reference="listingType">
                        <RadioButtonGroupInput optionText="name" />
                    </ReferenceInput>
                    <ImageField source="image_url" />
                    <ImageInput source="image" multiple={false}>
                        <ImageField source="src" />
                    </ImageInput>
                    <Stack direction={'row'} spacing={2} sx={{ alignItems: "center" }}>
                        <ReferenceInput
                            label="Location"
                            source="location_id"
                            reference="location"
                            sort={{ field: "name", order: "ASC"}}
                        >
                            <AutocompleteInput
                                sx={{ width: 400 }}
                                optionText="name"
                                optionValue="id"
                                validate={required()}
                                filterToQuery={ (searchText: string) => ({ "name@ilike": `%${searchText}%` })}
                            />
                        </ReferenceInput>
                        <ReferenceInput
                            label="Property Type"
                            source="property_type_id"
                            reference="propertyType"
                            sort={{ field: "name", order: "ASC"}}
                        >
                            <SelectInput sx={{ width: 300 }} optionText="name" optionValue="id" validate={required()} />
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
                    <BooleanInput source="actived" />
                    <DateInput label="Created date" source="created_at" disabled />
                </SimpleForm>
            </Edit>
        </div>
    )
};