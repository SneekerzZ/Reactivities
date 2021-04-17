import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
	const [editMode, setEditMode] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		agent.activities.list().then(response => {
			let activities: Activity[] = [];
			response.forEach(activity => {
				activity.date = activity.date.split('T')[0];
				activities.push(activity);
			})
			setActivities(activities);
			setLoading(false);
		});
	}, []);

	function HandleSelectActivity(id: string) {
		setSelectedActivity(activities.find(x => x.id === id));
	}

	function HandleCancelSelectActivity() {
		setSelectedActivity(undefined);
	}

	function HandleFormOpen(id?: string) {
		id ? HandleSelectActivity(id) : HandleCancelSelectActivity();
		setEditMode(true);
	}

	function HandleFormClose() {
		setEditMode(false);
	}

	function HandleCreateOrEditActivity(activity: Activity) {
		setSubmitting(true);
		if (activity.id) {
			agent.activities.update(activity).then(() => {
				setActivities([...activities.filter(x => x.id !== activity.id), activity]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
				setSubmitting(false);
			});
		}
	}

	function HandleDeleteActivity(id: string) {
		setSubmitting(true);
		agent.activities.delete(id).then(() => {
			setActivities([...activities.filter(x => x.id !== id)]);
			setSelectedActivity(undefined);
			setEditMode(false);
			setSubmitting(false);
		});
	}

	if (loading) return <LoadingComponent content='Loading app' />

	return (
		<Fragment>
			<NavBar openForm={HandleFormOpen} />
			<Container style={{ marginTop: '7em' }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					selectActivity={HandleSelectActivity}
					cancelSelectActivity={HandleCancelSelectActivity}
					editMode={editMode}
					openForm={HandleFormOpen}
					closeForm={HandleFormClose}
					createOrEdit={HandleCreateOrEditActivity}
					deleteActivity={HandleDeleteActivity}
					submitting={submitting}
				/>
			</Container>
		</Fragment>
	);
}

export default App;
