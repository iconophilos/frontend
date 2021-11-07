import React, { SyntheticEvent, useEffect, useState } from "react";
import {Redirect} from "react-router-dom";

const MonumentForm = (props: { name: string }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [dating, setDating] = useState('');
    const [architecturalPlant, setArchitecturalPlant] = useState('');
    const [model3D, setModel3D] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [monument, setMonument] = useState(null);

    if (props.name === '')  {
        return <Redirect to="/login"/>;
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(
            'https://localhost:8000/api/monuments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    type,
                    dating,
                    architectural_plant: architecturalPlant,
                    model_3d: model3D,
                    location: {
                        country,
                        region,
                        coordinates: {
                            latitude: latitude,
                            longitude: longitude,
                        }
                    },
                })
            }
        )

        const content = await response.json();

        setMonument(content)
    }
    return (
        <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">New Monument</h1>

        <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input type="text" className="form-control" name="name" placeholder="St. Nicholas" required 
                onChange={e => setName(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="type">Type:</label>
            <select id="type" defaultValue={'DEFAULT'} className="form-select" required onChange={e => setType(e.target.value)}>
                <option value="DEFAULT" disabled>Choose a monument type...</option>
                <option value="church">Church</option>
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="dating">Dating</label>
            <input type="text" className="form-control" name="dating" placeholder="330 a.C." required
                onChange={e => setDating(e.target.value)}
            />
        </div>
        

        <div className="mb-3">
            <label htmlFor="archPlant">Architectural Plant:</label>
            <input type="file" accept="image/png, image/jpeg" className="form-control" name="archPlant" required
                onChange={e => setArchitecturalPlant(e.target.value)}
            />
        </div>
        
        <div className="mb-3">
            <label htmlFor="3dModel">3D Model link:</label>
            <input type="text" className="form-control" name="3dModel" placeholder="https://foo.com/bar" required
               onChange={e => setModel3D(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="country">Country:</label>
            <select id="country" defaultValue={'DEFAULT'} className="form-select" required onChange={e => setCountry(e.target.value)}>
                <option value="DEFAULT" disabled>Choose a country...</option>
                <option value="greece">Greece</option>
                <option value="italy">Italy</option>
                <option value="turkey">Turkey</option>
                <option value="portugal">Portugal</option>
            </select>
        </div>

        <div className="mb-3">
            <label htmlFor="region">Region</label> 
            <input type="text" className="form-control" name="region" placeholder="Agios Nikolaos" required
                onChange={e => setRegion(e.target.value)}
            />
        </div>
    
        <div className="mb-3">
            <label htmlFor="latitude">Latitude</label> 
            <input type="text" className="form-control" name="latitude" placeholder="35.3657983" required
                onChange={e => setLatitude(e.target.value)}
            />
        </div>
    
        <div className="mb-3">
            <label htmlFor="longitude">Longitude</label> 
            <input type="text" className="form-control" name="longitude" placeholder="24.2636839" required
                onChange={e => setLongitude(e.target.value)}
            />
        </div>    
        
        <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
    </form>
    );
};

export default MonumentForm;
