import React, { useState, useEffect } from 'react'
import { TableContainer, Table, TableHead, TableBody,TableRow,TableCell, TextField } from '@mui/material'
import { Link } from "react-router-dom";

const Home = ()  => {
  const [phones, setPhones ] = useState([])
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
          await fetch("http://localhost:5000/read")
        ).json();
        setPhones(data);
      } catch (error) {
        console.log(error);
      }
    };
    dataFetch();
  }, []);

  const delet = async (id) => {
    try {
      await fetch("http://localhost:5000/delet",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
      })
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    const newPhone = {
      _id: (phones.length)+1,
      name: name,
      type: type,
      price: price,
      rate: rate,
      warranty_years: warranty_years,
      available: true
    }
    try {
      await fetch("http://localhost:5000/create",{
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

  if (!phones.length) {
    return <></>
  }
  else return (
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
              <TableCell>Modifié / Crée</TableCell>
              <TableCell>Supprimé</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phones.map((phone) => (
              <TableRow>
                <TableCell><TextField type="text"
                id="id"
                name="id"
                value={phone._id} disabled/></TableCell>
                
                <TableCell><TextField type="text"
                id="name"
                name="name"
                value={phone.name} disabled/></TableCell>

                <TableCell><TextField type="text"
                id="name"
                name="name"
                value={phone.type} disabled/></TableCell>

                <TableCell><TextField type="text"
                id="name"
                name="name"
                value={phone.price} disabled/></TableCell>
                
                <TableCell><TextField type="text"
                id="name"
                name="name"
                value={phone.rating} disabled/></TableCell>

                <TableCell><TextField type="text"
                id="name"
                name="name"
                value={phone.warranty_years} disabled/></TableCell>

                <TableCell><TextField type="text"
                id="name"
                name="name"
                value={phone.available.toString()} disabled/></TableCell>

                <TableCell><Link to={`/update/${phone._id}`}>Modifié</Link></TableCell>
                <TableCell><button onClick={e => delet(phone._id)}>Supprimer</button></TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell><TextField type='text' id="text" name="name" value={(phones.length)+1} disabled/></TableCell>
              
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

              <TableCell> <TextField type="checkbox"
                checked="true"
                id="available"
                name="available"
                onChange={handleChangeAvailable}
                value={available}
                 />
              </TableCell>
              <TableCell><button onClick={create}>Crée</button></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home