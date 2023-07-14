import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableHead, TableBody,TableRow,TableCell, TextField } from '@mui/material'
import { Link, useParams } from "react-router-dom";

const Home = ()  => {
    const url = useParams()
    const [id, setId ] = useState()
    const [name, setName ] = useState('');
    const [type, setType ] = useState('');
    const [price, setPrice ] = useState('');
    const [rate, setRate ] = useState('');
    const [warranty_years, setWarranty_years ] = useState('');
    const [available, setAvailable ] = useState('');

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeType = (event) => {
        setType(event.target.value)
    };
    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const handleChangeRate = (event) => {
        setRate(event.target.value);
    };
    const handleChangeWarranty_years = (event) => {
        setWarranty_years(event.target.value);
    };
    const handleChangeAvailable = (event) => {
        setAvailable(event.target.value);
    };

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const data = await (
                    await fetch("http://localhost:5000/findone",{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({url})
                    })
                ).json()
                setId(data._id);
                setName(data.name);
                setType(data.type);
                setPrice(data.price);
                setRate(data.rating);
                setWarranty_years(data.warranty_years);
                setAvailable(data.available);
            } catch (error) {
                console.log(error);
            }
        };
        dataFetch();
    }, []);

    const validation = async () => {
        const newPhone = {
            _id: id,
            name: name,
            type: type,
            price: price,
            rate: rate,
            warranty_years: warranty_years,
            available: true
        }
        try {
            await fetch("http://localhost:5000/update",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({newPhone})
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
        
        <TableContainer>
            <Table>
            <TableHead>
                <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Garantie</TableCell>
                <TableCell>Validité de garantie</TableCell>
                <TableCell>Validé</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell> <TextField type="text"
                    id="name"
                    name="name"
                    onChange={handleChangeName}
                    placeholder='Nom'
                    value={id} disabled/>
                </TableCell>

                <TableCell> <TextField type="text"
                    id="name"
                    name="name"
                    onChange={handleChangeName}
                    placeholder='Nom'
                    value={name} />
                </TableCell>

                <TableCell> <TextField type="text"
                    id="type"
                    name="type"
                    onChange={handleChangeType}
                    placeholder='Type'
                    value={type} />
                </TableCell>

                <TableCell> <TextField type="number"
                    id="price"
                    name="price"
                    onChange={handleChangePrice}
                    placeholder='Prix'
                    value={price}
                    />
                </TableCell>

                <TableCell> <TextField type="number"
                    id="rate"
                    name="rate"
                    onChange={handleChangeRate}
                    placeholder='Note'
                    value={rate}
                    />
                </TableCell>

                <TableCell> <TextField type="number"
                    id="warranty_years"
                    name="warranty_years"
                    onChange={handleChangeWarranty_years}
                    placeholder='Durée de garantie'
                    value={warranty_years}
                    />
                </TableCell>

                <TableCell> <TextField type="text"
                    checked="true"
                    id="available"
                    name="available"
                    onChange={handleChangeAvailable}
                    value={available}
                    />
                </TableCell>
                <TableCell><button onClick={validation}>Validé</button></TableCell>
                </TableRow>

            </TableBody>
            </Table>
        </TableContainer>
        <Link to={`/`}>Retour à la pâge d'accueil</Link>
        </div>
    )
}

export default Home