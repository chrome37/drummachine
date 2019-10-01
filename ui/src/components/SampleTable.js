import React from 'react';
import MaterialTable from 'material-table';

const SampleTable = (props) => {
    const columns = [
        {title: 'Pad', field: 'pad'},
        {title: 'Name', field: 'name'},
		{title: 'Actions', field: 'actions'}
	];
	
	const options = {
		search: false,
		paging: false
	}

    return (
		<MaterialTable title='Samples' columns={columns} options={options}></MaterialTable>	
    );
}

export default SampleTable;