import {
    useGetList,
    useList,
    ListContextProvider,
    DataTable,
    DateField,
    BooleanField,
    Pagination,
    EditButton,
    DeleteButton,
    CreateButton
} from 'react-admin';

export const PropertyTypeList = () => {
    const { data, isPending, error } = useGetList(
        'propertyType',
        { pagination: { page: 1, perPage: 100 } },
    );

    if (error) {
        return <p>Something went wrong!</p>;
    }

    const listContext = useList({ 
        data,
        isPending,
        perPage: 10,
        sort: { field: 'created_at', order: 'DESC' }
    });

    return (
        <ListContextProvider value={listContext}>
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
        </ListContextProvider>
    )
};