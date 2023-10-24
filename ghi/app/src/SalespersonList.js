function SalespersonList({ salespersons }) {
    const deleteSalesperson = async (id) => {
        const salespersonUrl = `http://localhost:8090/api/salespeople/${id}`
        const fetchConfig = {
            method: 'delete'
        }
        const response = await fetch(salespersonUrl, fetchConfig)
        if (response.ok) {
            window.location.reload()
        }
    }


    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee ID</th>
                </tr>
            </thead>
            <tbody>
                {salespersons.map(salesperson => {
                    return (
                        <tr key={salesperson.id}>
                            <td>{salesperson.first_name}</td>
                            <td>{salesperson.last_name}</td>
                            <td>{salesperson.employee_id}</td>
                            <td>
                                <button onClick={(e) => deleteSalesperson(salesperson.id)} >Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default SalespersonList
