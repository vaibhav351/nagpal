import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Foods = () => {

    // __________ GET API CALL FOR FETCHING DATA __________

    const [data, setData] = useState([])
    const [status, setStatus] = useState(false)

    const CallApi = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/foods", requestOptions)
            .then(response => response.json())
            .then(result => {
                setData(result)
                setStatus(true)
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        CallApi()
    }, [])

    // __________ GET API CALL FOR FETCHING DATA __________

    // __________ POST API CALL FOR ADDING DATA __________

    const [postData, setpostData] = useState({
        name: "",
        type: "",
        price: 0,
        available: true,
        category: "",
        currency: "",
        description: "",
        discount: 0,
        duration: 0,
        image: "",
        quantity: 0,
        ratings: 0,
        resturant: "",
        resturant_address: "",
        resturant_distance: 0,
        status: ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(postData);

        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/createfood", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setShow(false);
                CallApi()

            })
            .catch(error => console.log('error', error));

        // 
    }
    const handleShow = () => setShow(true);



    // console.log(postData)
    // __________ POST API CALL FOR ADDING DATA __________




    // __________ UPDATE API CALL FOR ADDING DATA __________

    //  const [UpdateData, setSingleData] = useState({
    //     name: "",
    //     type: "",
    //     price: 0,
    //     available: true,
    //     category: "",
    //     currency: "",
    //     description: "",
    //     discount: 0,
    //     duration: 0,
    //     image: "",
    //     quantity: 0,
    //     ratings: 0,
    //     resturant: "",
    //     resturant_address: "",
    //     resturant_distance: 0,
    //     status: ""
    // });

    const [SingleData, setSingleData] = useState({
        name: "",
        type: "",
        price: 0,
        available: true,
        category: "",
        currency: "",
        description: "",
        discount: 0,
        duration: 0,
        image: "",
        quantity: 0,
        ratings: 0,
        resturant: "",
        resturant_address: "",
        resturant_distance: 0,
        status: ""
    });
    const [singleDataStatus, setsingleDataStatus] = useState(false);

    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(SingleData);

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("/food/" + SingleData._id, requestOptions)
            .then(response => response.text())
            .then(result => {
                setShowUpdate(false);
                setsingleDataStatus(false)
                CallApi()
            })
            .catch(error => console.log('error', error));



    }
    const handleShowUpdate = (e) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("/food/" + e, requestOptions)
            .then(response => response.json())
            .then(result => {
                setShowUpdate(true);
                setSingleData(result)
                setsingleDataStatus(true)
            })
            .catch(error => console.log('error', error));

    }


    console.log("SingleData", SingleData)



    // console.log(postData)
    // __________ UPDATE API CALL FOR ADDING DATA __________




    // __________ DELETE API CALL FOR ADDING DATA __________

    const DeletetheData = (e) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("/food/" + e, requestOptions)
            .then(response => response.text())
            .then(result => {
                CallApi()
            })
            .catch(error => console.log('error', error));
    }

    // __________ DELETE API CALL FOR ADDING DATA __________

    return (
        <>
            {
                status ?
                    <>
                        <button className="btn btn-primary" onClick={handleShow}>Add Food</button>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {/* <th>Image</th> */}
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Price</th>
                                    <th>Available</th>
                                    <th>Category</th>
                                    {/* <th>Currency</th> */}
                                    {/* <th>Description</th> */}
                                    <th>Discount</th>
                                    <th>Duration</th>
                                    <th>Quantity</th>
                                    <th>Ratings</th>
                                    <th>Resturant</th>
                                    <th>Resturant Address</th>
                                    <th>Resturant Distance</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((items, i) => (
                                    <tr>
                                        {/* <td><img src={items.image} width={`10%`}/></td> */}
                                        <td>{items.name}</td>
                                        <td>{items.type}</td>
                                        <td>₹ {items.price}</td>
                                        <td style={{ backgroundColor: items.available ? "green" : "red" }}></td>
                                        <td style={{ backgroundColor: items.category === "VEG" ? "green" : "red", color: "white" }}>{items.category}</td>
                                        {/* <td>{items.currency}</td> */}
                                        {/* <td>{items.description}</td> */}
                                        <td>{items.discount}%</td>
                                        <td>{items.duration} min</td>
                                        <td>{items.quantity}</td>
                                        <td>{items.ratings}</td>
                                        <td>{items.resturant}</td>
                                        <td>{items.resturant_address}</td>
                                        <td>{items.resturant_distance} km</td>
                                        <td style={{ backgroundColor: items.status === "Gold" ? "#FFD700" : "#b9f2ff" }}>{items.status}</td>
                                        <td><button className="btn btn-primary mr-2" onClick={() => handleShowUpdate(items._id)}>Edit</button>
                                            <button className="btn btn-danger ml-4" onClick={() => DeletetheData(items._id)}>Delete</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </> : "Loading"
            }


            {/* ______________________ ADD FOOD MODAL ______________________  */}

            <Modal show={show} onHide={handleClose} className="foodAdd">
                <Modal.Header closeButton>
                    <Modal.Title>Add Foods</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">


                            <div className="col-6">
                                <input type="text" placeholder="Enter Name of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ name: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" placeholder="Enter Type of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ type: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" placeholder="Enter Price of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ price: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-12">
                                <input type="textarea" placeholder="Enter Description of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ description: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" placeholder="Enter discount of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ discount: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" placeholder="Enter duration of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ duration: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" placeholder="Enter image of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ image: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <select name="available" id="available" onChange={(e) => setpostData(postData => ({ ...postData, ...{ available: Boolean(e.target.value) } }))}>
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </select>
                            </div>

                            <div className="col-6">
                                <select name="available" id="available" onChange={(e) => setpostData(postData => ({ ...postData, ...{ category: e.target.value } }))}>
                                    <option value="VEG">VEG</option>
                                    <option value="NON-VEG">NON-VEG</option>
                                </select>
                            </div>

                            <div className="col-6">
                                <input type="number" placeholder="Enter quantity of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ quantity: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" placeholder="Enter ratings of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ ratings: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" placeholder="Enter resturant of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ resturant: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" placeholder="Enter resturant_address of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ resturant_address: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" placeholder="Enter resturant_distance of food" onChange={(e) => setpostData(postData => ({ ...postData, ...{ resturant_distance: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <select name="available" id="available" onChange={(e) => setpostData(postData => ({ ...postData, ...{ status: e.target.value } }))}>
                                    <option value="Gold">GOLD</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*______________________ ADD FOOD MODAL  ______________________*/}




            {/* ______________________ UPDATE FOOD MODAL ______________________ */}

            <Modal show={showUpdate} onHide={handleCloseUpdate} className="foodAdd">
                <Modal.Header closeButton>
                    <Modal.Title>Update Foods</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {singleDataStatus ? <div className="container-fluid">
                        <div className="row">


                            <div className="col-6">
                                <input type="text" value={SingleData.name} placeholder="Enter Name of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ name: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" value={SingleData.type} placeholder="Enter Type of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ type: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" value={SingleData.price} placeholder="Enter Price of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ price: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-12">
                                <input type="textarea" value={SingleData.description} placeholder="Enter Description of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ description: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" value={SingleData.discount} placeholder="Enter discount of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ discount: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" value={SingleData.duration} placeholder="Enter duration of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ duration: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" value={SingleData.image} placeholder="Enter image of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ image: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <select name="available" id="available" value={SingleData.available} onChange={(e) => setSingleData(postData => ({ ...postData, ...{ available: Boolean(e.target.value) } }))}>
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </select>
                            </div>

                            <div className="col-6">
                                <select name="available" id="available" value={SingleData.category} onChange={(e) => setSingleData(postData => ({ ...postData, ...{ category: e.target.value } }))}>
                                    <option value="VEG">VEG</option>
                                    <option value="NON-VEG">NON-VEG</option>
                                </select>
                            </div>

                            <div className="col-6">
                                <input type="number" value={SingleData.quantity} placeholder="Enter quantity of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ quantity: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" value={SingleData.ratings} placeholder="Enter ratings of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ ratings: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" value={SingleData.resturant} placeholder="Enter resturant of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ resturant: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="text" value={SingleData.resturant_address} placeholder="Enter resturant_address of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ resturant_address: e.target.value } }))} />
                            </div>

                            <div className="col-6">
                                <input type="number" value={SingleData.resturant_distance} placeholder="Enter resturant_distance of food" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ resturant_distance: Number(e.target.value) } }))} />
                            </div>

                            <div className="col-6">
                                <select name="available" value={SingleData.status} id="available" onChange={(e) => setSingleData(postData => ({ ...postData, ...{ status: e.target.value } }))}>
                                    <option value="Gold">GOLD</option>
                                    <option value="Premium">Premium</option>
                                </select>
                            </div>

                        </div>
                    </div> : "Loading"}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ______________________ UPDATE FOOD MODAL ______________________ */}
        </>
    );
}

export default Foods;
