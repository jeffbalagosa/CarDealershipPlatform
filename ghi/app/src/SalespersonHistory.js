import React, {useEffect, useState} from 'react';

function SalespersonHistory( props ) {

const [selectedSalesperson, setSelectedSalesperson] = useState('');
const filteredSales = props.sales.filter((sale) => sale.salesperson.id === selectedSalesperson)

const handleSelectChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedSalesperson(value);
  };







return (
    <div>
        <h1>Salesperson History</h1>
        <select value={selectedSalesperson} onChange={handleSelectChange}>
            <option value="">Select salesperson...</option>
            {props.salespersons.map(salesperson => (
                <option key={salesperson.id} value={salesperson.id}>
                    {salesperson.first_name} {salesperson.last_name}
                </option>
            ))}
        </select>
        <div>
            <table className="table table-striped" onChange={handleSelectChange}>
            <thead>
                <tr>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>Automobile VIN</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {filteredSales.map(sale => (
                    <tr key={sale.id}>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>{sale.price}</td>
                    </tr>
                ))}

            </tbody>
        </table>

</div>

    </div>
);
}

export default SalespersonHistory;
