import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/styles';
import { Select, MenuItem } from '@material-ui/core';

const useStyle = makeStyles(theme =>({
	tableWrapper: {
		height: '360px',
		overflow: 'auto'
	}
}));

const SampleSelect = (props) => {
	const {samples, handleAssign, pad} = props;
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		setValue(e.target.value);
		handleAssign(pad, e.target.value);
	}

	const items = samples.map(sample => {
		return(<MenuItem value={sample} key={sample.name} dense={true}>{sample.name}</MenuItem>)
	})
	return (
		<Select value={value} onChange={(e) => handleChange(e)}>
			<MenuItem value={null} dense={true}>None</MenuItem>
			{items}
		</Select>
	)
}

const SampleTable = (props) => {
	const classes = useStyle();
	const {samples, handleAssign, padData} = props;

    const columns = [
        {title: 'Pad', field: 'pad'},
        {title: 'Sample Assign', field: 'sampleAssign'},
		{title: 'Actions', field: 'actions'}
	];
	
	const options = {
		search: false,
		paging: false,
		padding: 'dense'
	}

	const data = padData.map(pad => {
		return {
			pad: pad.padName,
			sampleAssign: <SampleSelect samples={samples} handleAssign={handleAssign} pad={pad.padName} key={pad.padName}/>
		}
	})

    return (
		<div className={classes.tableWrapper}>
			<MaterialTable 
				title='Pad Data' 
				columns={columns} 
				options={options} 
				data={data}
			/>
		</div>
    );
}

export default SampleTable;