import React from 'react';

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

export function VoterForm() {
    return (
        <form>
        <div>
            <h2>Voter Form</h2>
        </div>
        <div>
        <label>
            ID <input type="integer" name="id" value={testDate.id}/>
        </label>
        <label>
            First Name <input type="text" name="firstname" value={testDate.firstname}/>
        </label>
        <label>
            Last Name <input type="text" name="lastname" value={testDate.lastname}/>
        </label>
        <label>
            Address <input type="text" name="address" value={testDate.address}/>
        </label>
        <label>
            City <input type="text" name="city" value={testDate.city}/>
        </label>
        <label>
            Birth Date <input type="text" name="birthdate" value={testDate.birthdate}/>
        </label>
        <label>
            Email Address <input type="text" name="email" value={testDate.email}/>
        </label>
        <label>
            Phone Number <input type="text" name="phone" value={testDate.phone}/>
        </label>
        </div>
        </form>
    );
}
