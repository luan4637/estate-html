import {
    useGetList,
    useList,
    ListContextProvider,
    DataTable,
    DateField,
    BooleanField,
    Pagination
} from 'react-admin';

export const ListingTypeList = () => {
    const { data, isPending, error } = useGetList(
        'listingType',
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
            <h1>Listing Management</h1>
            <DataTable rowClick={false}>
                <DataTable.Col source="name" />
                <DataTable.Col source="created_at" field={DateField} />
                <DataTable.Col source="actived" field={BooleanField} />
            </DataTable>
            <Pagination />
        </ListContextProvider>
    )
};