import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityList() {
	const [target, setTarget] = useState('');
	const { activityStore } = useStore();
	const { activitiesByDate, selectActivity, loading, deleteActivity} = activityStore;

	function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
		setTarget(e.currentTarget.name);
		deleteActivity(id);
	}

	return (
		<Segment>
			<Item.Group>
				{activitiesByDate.map(activitie => (
					<Item key={activitie.id}>
						<Item.Content>
							<Item.Header as='a'>{activitie.title}</Item.Header>
							<Item.Meta>{activitie.date}</Item.Meta>
							<Item.Description>
								<div>{activitie.description}</div>
								<div>{activitie.city}, {activitie.venue}</div>
							</Item.Description>
							<Item.Extra>
								<Button floated='right' content='View' color='blue' onClick={() => selectActivity(activitie.id)} />
								<Button
									name={activitie.id}
									floated='right'
									content='Delete'
									color='red'
									onClick={(e) => HandleActivityDelete(e, activitie.id)}
									loading={loading && target === activitie.id} />
								<Label basic content={activitie.category} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	)
})