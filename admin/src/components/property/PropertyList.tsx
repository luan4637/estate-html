import {
    useGetList,
    useList,
    ListContextProvider,
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
    SelectInput,
    TextField,
    ReferenceInput
} from 'react-admin';

import { Stack } from '@mui/material';

export const PropertyList = () => {
    const { data, isPending, error } = useGetList(
        'property',
        { pagination: { page: 1, perPage: 100 } },
    );

    if (error) {
        return <p>Something went wrong!</p>;
    }

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

    const listContext = useList({ 
        data,
        isPending,
        perPage: 10,
        sort: { field: 'id', order: 'ASC' }
    });

    return (
        <ListContextProvider value={listContext}>
            <h1>Properties Management</h1>
            <ListToolbar />
            <DataTable rowClick={false}>
                <DataTable.Col source="title" />
                <DataTable.Col source="location_id" label="Location">
                    <ReferenceField source="location_id" reference="location">
                        <TextField source="name" />
                    </ReferenceField>
                </DataTable.Col>
                <DataTable.Col source="property_type_id" label="PropertyType ">
                    <ReferenceField source="property_type_id" reference="propertyType">
                        <TextField source="name" />
                    </ReferenceField>
                </DataTable.Col>
                <DataTable.Col source="listing_type_id" label="Listing Type">
                    <ReferenceField source="listing_type_id" reference="listingType">
                        <TextField source="name" />
                    </ReferenceField>
                </DataTable.Col>
                <DataTable.Col source="created_at" field={DateField} />
                <DataTable.Col source="actived" field={BooleanField} />
                <DataTable.Col>
                    <EditButton />
                    <DeleteButton mutationMode="optimistic" />
                </DataTable.Col>
            </DataTable>
            <Pagination />
        </ListContextProvider>
    )
};