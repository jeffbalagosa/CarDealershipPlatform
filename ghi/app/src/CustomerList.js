function CustomerList({ customers }) {
    const deleteCustomer = async (id) => {
        const customerUrl = `http://localhost:8090/api/customers/${id}`
        const fetchConfig = {
            method: 'delete'
        }
        const response = await fetch(customerUrl, fetchConfig)
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
                    <th>Address</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                    return (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.address}</td>
                            <td>{customer.phone_number}</td>
                            <td>
                                <button onClick={(e) => deleteCustomer(customer.id)} >Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CustomerList
