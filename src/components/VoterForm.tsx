import React, {useState, ChangeEvent} from 'react';
import {NewVoter} from '../models/Voters';

let testDate = {
    id: 123,
    firstname: 'Fred',
    lastname: 'Flintstone',
    address: '123 calle de street',
    city: 'here',
    birthdate: '12/12/12',
    email: 'here@work.com',
    phone: '520-123-4567',
};

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
                <label>
                    First Name <input type="text" name="firstname" value={voterForm.firstname} onChange={change} />
                </label>
                <label>
                    Last Name <input type="text" name="lastname" value={voterForm.lastname} onChange={change} />
                </label>
            </div>
            <div>
                <label>
                    Address <input type="text" name="address" value={voterForm.address} onChange={change} />
                </label>
                <label>
                    City <input type="text" name="city" value={voterForm.city} onChange={change} />
                </label>
            </div>
            <div>
                <label>
                    Birth Date <input type="text" name="birthdate" value={voterForm.birthdate} onChange={change} />
                </label>
                <label>
                    Email Address <input type="text" name="email" value={voterForm.email} onChange={change} />
                </label>
                <label>
                    Phone Number <input type="text" name="phone" value={voterForm.phone} onChange={change} />
                </label>
            </div>
            <div>
                <button type="button" onClick={submitVoter}>
                    {props.buttonText}
                </button>
            </div>
        </form>
    );
}
