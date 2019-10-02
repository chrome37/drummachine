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

const AssignButton = props => {
	const {sampleName, handleAssign} = props;
	const [value, setValue] = useState('');
	const padNames = ["1", "2", "3", "4", "Q", "W", "E", "R", "A", "S", "D", "F", "Z", "X", "C", "V"];

	const menuItems = padNames.map(pad => {
		return(
			<MenuItem value={pad} key={pad}>{pad}</MenuItem>
		)
	});

	const handleChange = (e) => {
		setValue(e.target.value)
	}
	return (
		<div>
			<Select value={value} onChange={(e) => handleChange(e)}>
				{menuItems}
			</Select>
			<Button onClick={() => handleAssign(sampleName, value)}>Assign</Button>
		</div>
	)
}

const SampleTable = (props) => {
	const classes = useStyle();
	const {sampleData, handleAssign} = props;

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
		return ({pad: item.pad, name: item.name, actions: <AssignButton handleAssign={handleAssign} sampleName={item.name}/>});
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