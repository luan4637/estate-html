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

export const PropertyTypeList = () => {
    return (
        <ListBase
            resource="propertyType"
            sort={{ field: 'created_at', order: 'DESC' }}
        >
            <h1>Property Type Management</h1>
            <CreateButton />
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