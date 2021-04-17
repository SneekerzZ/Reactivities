import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, submitting }: Props) {
    const [target, setTarget] = useState('');

    function HandleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }

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
                                <Button
                                    name={activitie.id}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    onClick={(e) => HandleActivityDelete(e, activitie.id)}
                                    loading={submitting && target === activitie.id} />
                                <Label basic content={activitie.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}