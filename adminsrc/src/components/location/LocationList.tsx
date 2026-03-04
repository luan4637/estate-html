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

export const LocationList = () => {
    return (
        <ListBase
            resource="location"
            sort={{ field: 'created_at', order: 'DESC' }}
        >
            <h1>Locations Management</h1>
            <CreateButton />
            <DataTable rowClick={false}>
                <DataTable.Col source="name" />
                <DataTable.Col source="created_at" field={DateField} />
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