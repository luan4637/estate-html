import {
    ListBase,
    FilterForm,
    FilterButton,
    DataTable,
    DateField,
    BooleanField,
    ReferenceField,
    Pagination,
    EditButton,
    DeleteButton,
    CreateButton,
    TextInput,
    TextField,
    ReferenceInput,
    NumberField,
    ImageField
} from 'react-admin';

import { Stack } from '@mui/material';

export const PropertyList = () => {
    const propertyFilters = [
        <TextInput label="Search" source="q" alwaysOn />,
        <ReferenceInput label="Location" source="location_id" reference="location" />,
        <ReferenceInput label="Property Type" source="property_type_id" reference="propertyType" />,
        <ReferenceInput label="Listing Type" source="listing_type_id" reference="listingType" />,
        <TextInput label="Title" source="title" />,
        <TextInput label="Address" source="address" />,
    ];

    const ListToolbar = () => (
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <FilterForm filters={propertyFilters} />
            <Stack direction="row">
                <FilterButton filters={propertyFilters} style={{ whiteSpace: "nowrap" }} />
                <CreateButton />
            </Stack>
        </Stack>
    );

    return (
        <ListBase
            resource="property"
            sort={{ field: 'created_at', order: 'DESC' }}
        >
            <h2>Properties Management</h2>
            <ListToolbar />
            <DataTable rowClick={false} bulkActionButtons={false}>
                <DataTable.Col>
                    <ImageField source="image_url"
                        sx={{
                            '& img': {
                                maxWidth: 100,
                                maxHeight: 100,
                                objectFit: 'contain'
                            }
                        }}
                    />
                </DataTable.Col>
                <DataTable.Col source="title" />
                <DataTable.Col source="location_id" label="Location">
                    <ReferenceField source="location_id" reference="location" link={false}>
                        <TextField source="name" />
                    </ReferenceField>
                </DataTable.Col>
                <DataTable.Col source="property_type_id" label="Property Type ">
                    <ReferenceField source="property_type_id" reference="propertyType" link={false}>
                        <TextField source="name" />
                    </ReferenceField>
                </DataTable.Col>
                <DataTable.Col source="listing_type_id" label="Listing Type">
                    <ReferenceField source="listing_type_id" reference="listingType" link={false}>
                        <TextField source="name" />
                    </ReferenceField>
                </DataTable.Col>
                <DataTable.Col label="Median Price">
                    $<NumberField source="median_price" />
                </DataTable.Col>
                <DataTable.Col label="Median Rent">
                    $<NumberField source="median_rent" />
                </DataTable.Col>
                <DataTable.Col label="Created Date/Active">
                    <DateField source="created_at" />
                    <br />
                    Active: 
                    <BooleanField source="actived" />
                </DataTable.Col>
                <DataTable.Col>
                    <EditButton />
                    <DeleteButton mutationMode="optimistic" />
                </DataTable.Col>
            </DataTable>
            <Pagination />
        </ListBase>
    )
};