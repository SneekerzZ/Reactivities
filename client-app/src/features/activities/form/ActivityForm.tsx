import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom';

export default observer(function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const { loadActivity, createActivity, updateActivity, loading, loadingInitial } = activityStore;
	const { id } = useParams<{ id: string }>();

	const [activity, setActivity] = useState({
		id: '',
		title: '',
		category: '',
		description: '',
		date: '',
		city: '',
		venue: ''
	});

	useEffect(() => {
		if (id) loadActivity(id).then((activity) => setActivity(activity! ))
	}, [id, loadActivity]);

	function HandleSubmit() {
		if (activity.id.length === 0) {
			let newActivity = {
				...activity,
				id: uuid()
			};
			createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
		} else {
			updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
		}
	}

	function HandleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setActivity({ ...activity, [name]: value });
	}

	if (loadingInitial) return <LoadingComponent content='Loading activity...' />

	return (
		<Segment clearing>
			<Form onSubmit={HandleSubmit} autoComplete='off'>
				<Form.Input placeholder='Title' value={activity.title} name='title' onChange={HandleInputChange} />
				<Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={HandleInputChange} />
				<Form.Input placeholder='Category' value={activity.category} name='category' onChange={HandleInputChange} />
				<Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={HandleInputChange} />
				<Form.Input placeholder='City' value={activity.city} name='city' onChange={HandleInputChange} />
				<Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={HandleInputChange} />
				<Button floated='right' positive type='submit' content='Sumbit' loading={loading} />
				<Button floated='right' type='button' content='Cancel' as={Link} to='/activities' />
			</Form>
		</Segment>
	)
})