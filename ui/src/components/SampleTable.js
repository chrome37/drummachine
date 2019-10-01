import React from 'react';
import MaterialTable from 'material-table';

const SampleTable = (props) => {
	const {sampleData} = props;

    const columns = [
        {title: 'Pad', field: 'pad'},
        {title: 'Name', field: 'name'},
		{title: 'Actions', field: 'actions'}
	];
	
	const options = {
		search: false,
		paging: false
	}

	const data = sampleData.map(item => {
		return ({pad: item.pad, name: item.name});
	});

    return (
		<MaterialTable title='Samples' columns={columns} options={options} data={data}></MaterialTable>	
    );
}

export default SampleTable;