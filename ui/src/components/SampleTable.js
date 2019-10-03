import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/styles';
import { Select, Button, Grid, MenuItem } from '@material-ui/core';

const useStyle = makeStyles(theme =>({
	tableWrapper: {
		height: '360px',
		overflow: 'auto'
	}
}));

const AssignForm = props => {
	const {sampleName, handleAssign, padNames} = props;
	const [value, setValue] = useState('');

	const menuItems = padNames.map(pad => {
		return(
			<MenuItem value={pad} key={pad}>{pad}</MenuItem>
		)
	});

	const handleChange = (e) => {
		handleAssign(sampleName, e.target.value);
		setValue(e.target.value)
	}
	return (
		<div>
			<Select value={value} onChange={(e) => handleChange(e)}>
				{menuItems}
			</Select>
		</div>
	)
}

const SampleTable = (props) => {
	const classes = useStyle();
	const {sampleData, handleAssign, notAssigned} = props;

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
		return ({
			pad: <AssignForm handleAssign={handleAssign} sampleName={item.name} padNames={notAssigned}/>, 
			name: item.name
		});
	});

    return (
		<div className={classes.tableWrapper}>
			<MaterialTable 
				title='Samples' 
				columns={columns} 
				options={options} 
				data={data}
			/>
		</div>
    );
}

export default SampleTable;