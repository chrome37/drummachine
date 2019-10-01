import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';

const useStyle = makeStyles({

});

const SampleTable = (props) => {
	const classes = useStyle();
	const [data, setData] = useState({});

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