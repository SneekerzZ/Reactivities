import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props) {
    return (
        <Segment>
            <Item.Group>
                {activities.map(activitie => (
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
                                <Button floated='right' content='Delete' color='red' onClick={() => deleteActivity(activitie.id)} />
                                <Label basic content={activitie.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}