import React from 'react'
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import { TabPanel } from './TabPanel';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            metaData: [],
            modalOpen: false,
            currCity: []
        }

    }

    handleModal = (flag) => {
        this.setState({ modalOpen: flag });
    }
    componentDidMount = () => {
        axios
            .get(
                `https://data.covid19india.org/state_district_wise.json`
            )
            .then((response) => {

                let states = [];
                // let result = [response.data].map(Object.values)
                // console.log(result)
                for (const state in response.data) {
                    // console.log(`${state}: ${response.data[state]}`);

                    let temp = [];
                    for (const city in response.data[state].districtData) {
                        temp.push({
                            city_name: city,
                            active: response.data[state].districtData[city].active,
                            confirmed: response.data[state].districtData[city].confirmed,
                            deceased: response.data[state].districtData[city].deceased,
                            delta: response.data[state].districtData[city].delta,
                            migratedother: response.data[state].districtData[city].migratedother,
                            notes: response.data[state].districtData[city].notes,
                            recovered: response.data[state].districtData[city].recovered,
                        })
                    }
                    states.push({
                        state_name: state,
                        districtData: temp
                    })

                }
                states.splice(0, 1)
                this.setState({ metaData: states });
                console.log(states)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <React.Fragment>
                {/* <div style={{ display: 'flex' }}> */}
                    <div className="navbar">
                        {/* <img src={Syringe} /> */}
                        <h1 className="heading">
                            COVID-19 DASHBOARD
                        </h1>
                    </div>
                    <div style={{
                        margin: '3em 5em 1em 5em',
                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)'
                    }}>
                        {this.state.metaData.map((item) => (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography  > <div className="typo-pills">
                                        {/* <Chip label={item.vaccine} color="primary" />
                                {item.available_capacity_dose1 > 0 && <Chip variant="outlined" label={"DOSE-I"} color="success" />}
                                {item.available_capacity_dose2 > 0 && <Chip variant="outlined" label={"DOSE-II"} color="success" />}
                                <Chip variant="outlined" label={`AGE-${item.min_age_limit}+`} color="primary" /> */}
                                    </div>
                                        {item.state_name}


                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                        {item.districtData.map((cities) => (
                                            // <Button > 
                                            <Chip onClick={() => { this.setState({ currCity: cities }); this.handleModal(true) }} style={{ margin: '0.5rem' }} label={cities.city_name} variant="outlined" color="success" />
                                            // </Button>

                                            //             {cities.city_name}



                                        ))}
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                        ))
                        }

                        <Modal
                            open={this.state.modalOpen}
                            onClose={() => this.handleModal(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                // border: '2px solid #000',
                                boxShadow: 24,
                                borderRadius: '10px',
                                p: 4,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h1>   {this.state.currCity.city_name}</h1>
                                </div>


                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Chip style={{ margin: '0.5rem' }} label={`Active Cases : ${this.state.currCity.active}`} variant="outlined" color="primary" />
                                        <Chip style={{ margin: '0.5rem' }} label={`Confirmed Cases: ${this.state.currCity.confirmed}`} variant="outlined" />
                                        <Chip style={{ margin: '0.5rem' }} label={`Deceased : ${this.state.currCity.deceased}`} />
                                        <Chip style={{ margin: '0.5rem' }} label={`Migrated : ${this.state.currCity.migratedother}`} variant="outlined" />
                                        <Chip style={{ margin: '0.5rem' }} label={`Recovered : ${this.state.currCity.recovered}`} color="success" />
                                    </div>

                                </Typography>
                            </Box>
                        </Modal>
                    </div>
                {/* </div > */}
            </React.Fragment>
        )
    }
}
