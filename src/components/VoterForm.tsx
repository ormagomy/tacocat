import {TextField, Button} from '@material-ui/core';
import React, {useState, ChangeEvent} from 'react';
import {NewVoter} from '../models/Voters';

type HTMLFormControls = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type VoterFormProps = {
    buttonText: string;
    onAddVoter: (voterForm: NewVoter) => void;
};

function isInput(x: any): x is HTMLInputElement {
    return x instanceof HTMLInputElement;
}

export function VoterForm(props: VoterFormProps) {
    const [voterForm, setVoterForm] = useState<NewVoter>({
        firstname: '',
        lastname: '',
        address: '',
        city: '',
        birthdate: '',
        email: '',
        phone: '',
    });

    const submitVoter = () => {
        props.onAddVoter({
            ...voterForm,
        });

        setVoterForm({firstname: '', lastname: '', address: '', city: '', birthdate: '', email: '', phone: ''});
    };
    const change = (e: ChangeEvent<HTMLFormControls>) => {
        setVoterForm({
            ...voterForm,
            [e.target.name]: isInput(e.target) && e.target.type === 'number' ? e.target.valueAsNumber : e.target.value,
        });
    };

    return (
        <form>
            <div>
                <h2>Voter Form</h2>
            </div>
            <div>
                <TextField id="outlined-basic" label="First Name" type="text" name="firstname" required={true} style={{margin: 15}} value={voterForm.firstname} onChange={change} />
                <TextField id="outlined-basic" label="Last Name" type="text" name="lastname" required={true} style={{margin: 15}} value={voterForm.lastname} onChange={change} />
            </div>
            <div>
                <TextField id="outlined-basic" label="Address" type="text" name="address" style={{margin: 15}} value={voterForm.address} onChange={change} />
                <TextField id="outlined-basic" label="City" type="text" name="city" style={{margin: 15}} value={voterForm.city} onChange={change} />
            </div>
            <div>
                <TextField
                    id="outlined-basic"
                    label="Birth Date"
                    type="date"
                    name="birthdate"
                    style={{margin: 15}}
                    InputLabelProps={{shrink: true}}
                    value={voterForm.birthdate}
                    onChange={change}
                ></TextField>
                <TextField id="outlined-basic" label="Email Address" type="text" name="email" style={{margin: 15}} value={voterForm.email} onChange={change} />
                <TextField id="outlined-basic" label="Phone Number" type="text" name="phone" style={{margin: 15}} value={voterForm.phone} onChange={change} />
            </div>
            <div>
                <br></br>
                <Button size="small" variant="contained" onClick={submitVoter}>
                    {props.buttonText}
                </Button>
                <br></br>
            </div>
        </form>
    );
}
