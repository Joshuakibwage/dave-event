


const EventDetails = async({params} : {params: Promise<{id: string}>}) => {

    const { id } = await params;

    return (
        <div>
            <p>Event details page for - {id}</p>
        </div>
    )
}

export default EventDetails;