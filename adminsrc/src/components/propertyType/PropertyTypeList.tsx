import {
    ListBase,
    DataTable,
    DateField,
    BooleanField,
    Pagination,
    EditButton,
    DeleteButton,
    CreateButton
} from 'react-admin';

import { Stack } from '@mui/material';

export const PropertyTypeList = () => {
    return (
        <ListBase
            resource="propertyType"
            sort={{ field: 'created_at', order: 'DESC' }}
        >
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <h2>Property Type Management</h2>
                <CreateButton />
            </Stack>
            <DataTable rowClick={false}>
                <DataTable.Col source="name" />
                <DataTable.Col source="created_at" field={DateField} />
                <DataTable.Col source="icon" />
                <DataTable.Col source="actived" field={BooleanField} />
                <DataTable.Col>
                    <EditButton />
                    <DeleteButton mutationMode="optimistic" />
                </DataTable.Col>
            </DataTable>
            <Pagination />
        </ListBase>
    )
};