import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

const useStyle = makeStyles(theme =>({
	tableWrapper: {
		height: '360px',
		overflow: 'auto'
	}
}));

const PadNameInput = (props) => {
	const {padName} = props;
	const [input, setInput] = useState(padName);

	const handleChange = e => {
		setInput(e.target.value);
	}

	return(
		<TextField value={input} onChange={(e) => handleChange(e)}></TextField>
	)
}

const SampleTable = (props) => {
	const classes = useStyle();
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
		return ({pad: <PadNameInput padName={item.pad}/>, name: item.name});
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